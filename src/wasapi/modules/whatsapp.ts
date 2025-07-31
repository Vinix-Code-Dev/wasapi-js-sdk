//create module for whatsapp

import { AxiosClient } from "../client";
import { ChangeStatusParams, SendAttachmentParams, SendMessageParams } from "../models/message.model";
import { SendContactParams } from "../models/SendContact.model";
import { SendTemplateParams } from "../models/template.model";
import { FlowAssets, FlowResponse, SendFlowParams } from "../models/flows.model";


export class WhatsappModule {
    constructor(private client: AxiosClient) { }

    //posthttps://api-ws.wasapi.io/api/v1/whatsapp-messages  params message, wa_id, from_id  crea un try catch para manejar el error
    async sendMessage(params: SendMessageParams): Promise<any> {
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

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/change-status cambia el estado de una conversacion o la trasfiere a nuevo agente de chat
    async changeStatus(params: ChangeStatusParams): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-messages/change-status', params);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al cambiar el estado de la conversacion:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/send-contacts
    async sendContacts(params: SendContactParams): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-messages/send-contacts', params);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar los contactos:', error);
            throw error;
        }
    }

    // GET https://api-ws.wasapi.io/api/v1/whatsapp-flows
    async getFlows(): Promise<any> {
        try {
            const response = await this.client.get('/whatsapp-flows');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al cargar los flujos de whatsapp:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-flows enviar un mensaje con un flujo
    async sendFlow(params: SendFlowParams ): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-flows', params);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el mensaje con un flujo:', error);
            throw error;
        }
    }

   // GET https://api-ws.wasapi.io/api/v1/whatsapp-flows/{flow_id}/responses?page=1&per_page=10 consultar las respuestas de un flujo
   async getFlowResponses(params: FlowResponse): Promise<any> {
    try {
        const response = await this.client.get(`/whatsapp-flows/${params.flow_id}/responses?page=${params.page}&per_page=${params.per_page}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al cargar las respuestas del flujo:', error);
        throw error;
    }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-flows/{flow_id}/assets?phone_id={phone_id}  consultar los recursos de un flujo
    async getFlowAssets(params: FlowAssets): Promise<any> {
        try {
            const response = await this.client.post(`/whatsapp-flows/${params.flow_id}/assets?phone_id=${params.phone_id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {   
            console.error('Error al cargar los recursos del flujo:', error);
            throw error;
        }
    }

}   