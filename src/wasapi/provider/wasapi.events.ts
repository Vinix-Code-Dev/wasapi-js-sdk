import { EventEmitterClass, utils } from "@builderbot/bot";
import { ProviderEventTypes } from "@builderbot/bot/dist/types";
import { WasapiClient } from "..";


export type WasapiMessage = {
    event: string;
    data: {
      user_id: number;
      from_id: number;
      message: string;
      type: "in" | "out";
      message_type: "text" | "image" | "video" | "audio" | "document" | "location";
      wa_id: string;
      wam_id: string;
      context_wam_id?: string;
      status: string;
      caption?: string;
      filename?: string ;
      origin: string;
      data: string;
      created_at: string; // ISO 8601
      updated_at: string; // ISO 8601
      id: number;
      chat_status: {
        conversation_status: "open" | "closed" | string;
        conversation_expiration: number;
      };
    };
  };

  

export class WasapiEvents extends EventEmitterClass<ProviderEventTypes> {

    private wasapiClient: WasapiClient;
    private apiKey: string;
    private baseURL?: string;

    /**
     * Constructor de la clase WasapiEvents
     * @param apiKey - Clave de API para autenticación con Wasapi
     * @param baseURL - URL base opcional para el cliente Wasapi
     */
    constructor(apiKey: string, baseURL?: string)  {
        super();
        this.apiKey = apiKey;
        this.baseURL = baseURL;
        this.wasapiClient = new WasapiClient(apiKey, baseURL);
    }

    /**
     * Función que maneja el evento de mensaje entrante de Wasapi.
     * @param payload - El mensaje entrante de Wasapi
     */
    public eventInMsg = async (payload: WasapiMessage) => {

        if (payload.data.type !== "in" || payload.data.wa_id.includes("g.us")) return;

        const sendObj = {
            body: payload.data.message || "",
            from: payload.data.wa_id, // Número que envía
            name: await this.getName(payload),
            host: {
                phone: payload.data.from_id.toString()
            },
            raw: payload
        }
        if (['image', 'video'].includes(payload.data.message_type)) sendObj.body = utils.generateRefProvider('_event_media_')
        if (payload.data.message_type === 'document') sendObj.body = utils.generateRefProvider('_event_document_')
        if (payload.data.message_type === 'audio') sendObj.body = utils.generateRefProvider('_event_voice_note_')
        if (payload.data.message_type === 'location') sendObj.body = utils.generateRefProvider('_event_location_')

        this.emit('message', sendObj)
    }



    /**
     * Función para obtener el nombre de la cuenta de WhatsApp.
     * @param payload - El mensaje de Wasapi
     * @returns El nombre de la cuenta
     */
    private async getName(payload: WasapiMessage): Promise<string> {
        try {
            const contact = await this.wasapiClient.contacts.getById(payload.data.wa_id);
            if (contact) {
                return contact.data.first_name;
            }
            return "Usuario";
        } catch (error) {
            console.error('Error al obtener nombre del contacto:', error);
            return "Usuario";
        }
    }

}