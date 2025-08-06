import { Middleware } from 'polka';
import { writeFile } from 'fs/promises'
import { createReadStream } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProviderClass, utils } from "@builderbot/bot";
import { BotContext, GlobalVendorArgs, SendOptions } from "@builderbot/bot/dist/types";
import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'
import mime from 'mime-types'
import { WasapiEvents } from './wasapi.events';
import { SendMessage } from '../models';

const URL_S3 = 'https://wasapi-assets.s3.us-east-2.amazonaws.com/media'

export type WasapiArgs = GlobalVendorArgs & { token: string, deviceId: string }

/**
 * Provider class for interacting with the Wasapi API.
 */
export class WasapiProvider extends ProviderClass<WasapiEvents> {
    globalVendorArgs: WasapiArgs = {
        name: 'bot',
        port: 3000,
        token: undefined,
        deviceId: undefined
    };

    /**
     * Constructor for WasapiProvider.
     * @param args - Arguments for WasapiProvider.
     */
    constructor(args?: WasapiArgs) {
        super();
        this.globalVendorArgs = { ...this.globalVendorArgs, ...args }
        if (!this.globalVendorArgs.token) {
            throw new Error('Must provide Wasapi Token https://ayuda.wasapi.io/es/articles/8843315-uso-de-la-api-de-wasapi')
        }
        if (!this.globalVendorArgs.deviceId) {
            throw new Error('You must provide the DeviceID https://api-docs.wasapi.io/reference/get_whatsapp-numbers')
        }
    }

    /**
     * Initialize the Wali vendor and set up the server.
     * @returns Promise<any>
     */
    protected async initVendor(): Promise<any> {
        const vendor = new WasapiEvents(this.globalVendorArgs.token)
        this.vendor = vendor
        this.server = this.server
            .post('/webhook/wasapi', this.ctrlInMsg)
    await this.checkStatus(this.globalVendorArgs.deviceId);
        return vendor
    }

    /**
     * Some logic before init http server
     * @returns void
     */
    protected beforeHttpServerInit(): void {
    }

    /**
     * Some logic after init http server
     * @returns void
     */
    protected afterHttpServerInit(): void {
    }

    /**
     * @returns void
     */
    protected busEvents = (): { event: string; func: Function; }[] => {
        return [
            {
                event: 'auth_failure',
                func: (payload: any) => this.emit('auth_failure', payload),
            },
            {
                event: 'ready',
                func: () => this.emit('ready', true),
            },
            {
                event: 'message',
                func: (payload: BotContext) => {
                    this.emit('message', payload)
                },
            },
            {
                event: 'host',
                func: (payload: any) => {
                    this.emit('host', payload)
                },
            }
        ]
    }

    private fileTypeFromFile = async (response: AxiosResponse): Promise<{ type: string | null; ext: string | false }> => {
        const type = response.headers['content-type'] ?? ''
        const ext = mime.extension(type)
        return {
            type,
            ext,
        }
    }

    /**
     * Middleware function for handling incoming messages.
     */
    protected ctrlInMsg: Middleware = (req, res) => {
        this.vendor.eventInMsg(req.body)
        return res.end('ok')
    }

    /**
     * Function to donwload the files incoming
     * @param idResource 
     * @returns 
     */
    private downloadFile = async (idResource: string): Promise<{ buffer: Buffer; extension: string }> => {
        try {
            const urlMedia = `${URL_S3}/${idResource}`
            const response: AxiosResponse = await axios.get(urlMedia, {
                headers: {
                    Token: this.globalVendorArgs.token,
                },
                responseType: 'arraybuffer',
            })
            const { ext } = await this.fileTypeFromFile(response)
            if (!ext) throw new Error('Unable to determine file extension')
            return {
                buffer: response.data,
                extension: ext,
            }
        } catch (error) {
            console.error(error.message)
        }
    }



    /**
     * Upload a file to get a URL for Wasapi attachment
     * @param urlOrPathfile - URL or path of the file to upload.
     * @returns Promise<string> - URL of the uploaded file.
     */
    private uploadToVendor = async (urlOrPathfile: string): Promise<string> => {
        const fileDownloaded = await utils.generalDownload(urlOrPathfile)
        const formData = new FormData()
        const mimeType = mime.lookup(fileDownloaded) || 'application/octet-stream'
        formData.append('file', createReadStream(fileDownloaded), {
            contentType: mimeType,
        })

        try {
            // Subir archivo a Wasapi (necesitas implementar este endpoint)
            const response = await axios.post(
                `https://api-ws.wasapi.io/api/v1/files`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${this.globalVendorArgs.token}`,
                        ...formData.getHeaders()
                    },
                }
            )
            return response.data.url || response.data.data.url
        } catch (err) {
            console.error('Error uploading file:', err.response?.data || err.message)
            throw err
        }
    }

    /**
     * Check the status of the Wasapi device.
     * @param deviceId - ID of the device to check.
     */
    checkStatus = async (deviceId: string) => {
        try {
            const response = await this.vendor.getClient().whatsapp.getWhatsappNumbers();
            const data = response.data;

            // Buscar el dispositivo específico en el array
            const device = data.find((device: any) => device.id.toString() === deviceId);

            if (!device) {
                this.emit('auth_failure', {
                    instructions: [
                        `Device with ID ${deviceId} not found`,
                        'Please check your device ID at: https://api-docs.wasapi.io/reference/get_whatsapp-numbers'
                    ]
                });
                return;
            }

            // Si el dispositivo existe, considerarlo como listo
            console.log(`Device ${deviceId} found: ${device.display_name} (${device.phone_number})`);
            this.emit('ready');
            return;
        } catch (err) {
            console.error('Error checking device status:', err);
            this.emit('auth_failure', { 
                instructions: [
                    'Unable to check device status',
                    'Please verify your token and device ID'
                ] 
            });
            return;
        }
    }

    /**
     * Send a message to a user using Wasapi API.
     * @param userId - ID of the user to send the message to.
     * @param message - Message content.
     * @param options - Additional options for sending the message.
     * @returns Promise<any>
     */
    async sendMessage(userId: string, message: any): Promise<any> {
        // Preparar el payload para Wasapi
        const payload: SendMessage = {
            message: message,
            wa_id: userId,
            from_id: this.globalVendorArgs.deviceId
        }

        try {
            const response = await this.vendor.getClient().whatsapp.sendMessage(payload);
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    /**
     * Helper method to determine file type for Wasapi attachment
     */
    private getFileType(filePath: string): 'image_url' | 'video_url' | 'document_url' | 'audio_url' {
        const extension = filePath.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
            return 'image_url';
        } else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
            return 'video_url';
        } else if (['mp3', 'wav', 'ogg', 'm4a'].includes(extension)) {
            return 'audio_url';
        } else {
            return 'document_url';
        }
    }

    /**
     * Save a file from a message context.
     * @param ctx - Bot context containing the file information.
     * @param options - Additional options for saving the file.
     * @returns Promise<string> - Path of the saved file.
     */
    async saveFile(ctx: BotContext & { data?: { media: { links?: { download: string } } } }, options?: { path: string; }): Promise<string> {
        if (!ctx?.data?.media) return ''
        try {
            const { buffer, extension } = await this.downloadFile(ctx.data.media.links.download)
            const fileName = `file-${Date.now()}.${extension}`
            const pathFile = join(options?.path ?? tmpdir(), fileName)
            await writeFile(pathFile, buffer)
            return pathFile
        } catch (err) {
            console.log(`[Error]:`, err.message)
            return 'ERROR'
        }
    }
}
