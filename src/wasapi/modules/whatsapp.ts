//create module for whatsapp

import { AxiosClient } from "../client";
import { SendAttachmentParams } from "../models/message.model";
import { SendTemplateParams } from "../models/template.model";


export class WhatsappModule {
    constructor(private client: AxiosClient) { }

    //posthttps://api-ws.wasapi.io/api/v1/whatsapp-messages  params message, wa_id, from_id  crea un try catch para manejar el error
    async sendMessage(params: { message: string, wa_id: string, from_id?: string }): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-messages', params);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/attachment enviar un archivo multimedia a whatsapp
    async sendAttachment(params: SendAttachmentParams): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-messages/attachment', params);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el archivo multimedia:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/send-template
    // Enviar mensaje de plantilla de WhatsApp soporte hasta 20 destinarios por envio
    async sendTemplate(params: SendTemplateParams): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-messages/send-template', params);
            console.log('Mensaje de plantilla enviado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar mensaje de plantilla:', error);
            throw error;
        }
    }

    // get https://api-ws.wasapi.io/api/v1/whatsapp-messages/{wa_id} cargar la conversacion de whatsapp con wa_id y from_id
    async getConversation(params: { wa_id: string, from_id?: string, page?: number }): Promise<any> {

        try {
            const response = await this.client.get(`/whatsapp-messages/${params.wa_id}?from_id=${params.from_id}&page=${params.page}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al cargar la conversacion:', error);
            throw error;
        }
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-numbers consultar lineas de whatsapp de mi cuenta wasapi 
    async getWhatsappNumbers(): Promise<any> {
        try {
            const response = await this.client.get('/whatsapp-numbers');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al cargar los numeros de whatsapp:', error);
            throw error;
        }
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-templates consultar plantillas de whatsapp
    async getWhatsappTemplates(): Promise<any> {
        try {
            const response = await this.client.get('/whatsapp-templates');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al cargar las plantillas de whatsapp:', error);
            throw error;
        }
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-templates/{template_uuid} consultar una plantilla de whatsapp
    async getWhatsappTemplate(data: { template_uuid: string }): Promise<any> {
        try {
            const response = await this.client.get(`/whatsapp-templates/${data.template_uuid}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al cargar la plantilla de whatsapp:', error);
            throw error;
        }
    }

    // https://api-ws.wasapi.io/api/v1/whatsapp-templates/sync-meta sincronizar plantillas de meta con wasapi
    async syncMetaTemplates(): Promise<any> {
        try {
            const response = await this.client.get('/whatsapp-templates/sync-meta');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al sincronizar las plantillas de meta:', error);
            throw error;
        }
    }


    
} 