import { AxiosClient } from "../client";
import { ChangeStatusParams} from "../models/shared/message.model";
import { SendContact } from "../models/request/contactWpp.model";
import { SendTemplate} from "../models/request/template.model";
import { ResponseAttachmentWPP, ResponseConversation, ResponseMessageWPP, ResponseSendContact, ResponseWhatsappNumbers } from "../models/response/whatsapp.model";
import { SendAttachment, SendMessage } from "../models/request/message.model";
import { ResponseTemplate, ResponseTemplateById, ResponseTemplateSyncMeta } from "../models/response/template.model";
import { ExitResponse } from "../models/response/exit.model";
import { ResponseAllFlows, ResponseFlowResponses, ResponseSendFlow } from "../models/response/flow.model";
import { GetFlowAssets, GetFlowDetail, GetFlowResponses, SendFlow } from "../models/request/flow.model";


export class WhatsappModule {
    constructor(private client: AxiosClient) { }

    //posthttps://api-ws.wasapi.io/api/v1/whatsapp-messages  params message, wa_id, from_id  crea un try catch para manejar el error
    async sendMessage(params: SendMessage): Promise<ResponseMessageWPP> {
        try {
            const response = await this.client.post('/whatsapp-messages', params);
            console.log('Mensaje enviado:');
            return response.data as ResponseMessageWPP;
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/attachment enviar un archivo multimedia a whatsapp
    async sendAttachment(params: SendAttachment): Promise<ResponseAttachmentWPP> {
        try {
            const response = await this.client.post('/whatsapp-messages/attachment', params);
            console.log('Archivo multimedia enviado:');
            return response.data as ResponseAttachmentWPP;
        } catch (error) {
            console.error('Error al enviar el archivo multimedia:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/send-template
    // Enviar mensaje de plantilla de WhatsApp soporte hasta 20 destinarios por envio
    async sendTemplate(params: SendTemplate): Promise<ResponseTemplate> {
        try {
            const response = await this.client.post('/whatsapp-messages/send-template', params);
            console.log('Mensaje de plantilla enviado:');
            return response.data as ResponseTemplate;
        } catch (error) {
            console.error('Error al enviar mensaje de plantilla:', error);
            throw error;
        }
    }

    // get https://api-ws.wasapi.io/api/v1/whatsapp-messages/{wa_id} cargar la conversacion de whatsapp con wa_id y from_id
    async getConversation(params: { wa_id: string, from_id?: string, page?: number }): Promise<ResponseConversation> {

        try {
            const response = await this.client.get(`/whatsapp-messages/${params.wa_id}?from_id=${params.from_id}&page=${params.page}`);
            console.log('Conversacion cargada:');
            return response.data as ResponseConversation;
        } catch (error) {
            console.error('Error al cargar la conversacion:', error);
            throw error;
        }
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-numbers consultar lineas de whatsapp de mi cuenta wasapi 
    async getWhatsappNumbers(): Promise<ResponseWhatsappNumbers> {
        try {
            const response = await this.client.get('/whatsapp-numbers');
            console.log('Numeros de whatsapp cargados:');
            return response.data as ResponseWhatsappNumbers;
        } catch (error) {
            console.error('Error al cargar los numeros de whatsapp:', error);
            throw error;
        }
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-templates consultar plantillas de whatsapp
    async getWhatsappTemplates(): Promise<ResponseTemplate> {
        try {
            const response = await this.client.get('/whatsapp-templates');
            console.log('Plantillas de whatsapp cargadas:');
            return response.data as ResponseTemplate;
        } catch (error) {
            console.error('Error al cargar las plantillas de whatsapp:', error);
            throw error;
        }
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-templates/{template_uuid} consultar una plantilla de whatsapp
    async getWhatsappTemplate(data: { template_uuid: string }): Promise<ResponseTemplateById> {
        try {
            const response = await this.client.get(`/whatsapp-templates/${data.template_uuid}`);
            console.log('Plantilla de whatsapp cargada con uuid: ' + data.template_uuid);
            return response.data as ResponseTemplateById;
        } catch (error) {
            console.error('Error al cargar la plantilla de whatsapp:', error);
            throw error;
        }
    }

    // https://api-ws.wasapi.io/api/v1/whatsapp-templates/sync-meta sincronizar plantillas de meta con wasapi
    async syncMetaTemplates(): Promise<ResponseTemplateSyncMeta> {
        try {
            const response = await this.client.get('/whatsapp-templates/sync-meta');
            console.log('Plantillas de meta sincronizadas:');
            return response.data as ResponseTemplateSyncMeta;
        } catch (error) {
            console.error('Error al sincronizar las plantillas de meta:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/change-status cambia el estado de una conversacion o la trasfiere a nuevo agente de chat
    async changeStatus(params: ChangeStatusParams): Promise<ExitResponse> {
        try {
            const response = await this.client.post('/whatsapp-messages/change-status', params);
            console.log('Estado de la conversacion cambiado:');
            return response.data as ExitResponse;
        } catch (error) {
            console.error('Error al cambiar el estado de la conversacion:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/send-contacts
    async sendContacts(params: SendContact): Promise<ResponseSendContact> {
        try {
            const response = await this.client.post('/whatsapp-messages/send-contacts', params);
            console.log('Contactos enviados:');
            return response.data as ResponseSendContact;
        } catch (error) {
            console.error('Error al enviar los contactos:', error);
            throw error;
        }
    }

    // GET https://api-ws.wasapi.io/api/v1/whatsapp-flows
    async getFlows(): Promise<ResponseAllFlows> {
        try {
            const response = await this.client.get('/whatsapp-flows');
            console.log('Flujos de whatsapp cargados:');
            return response.data as ResponseAllFlows;
        } catch (error) {
            console.error('Error al cargar los flujos de whatsapp:', error);
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-flows enviar un mensaje con un flujo
    async sendFlow(params: SendFlow ): Promise<ResponseSendFlow> {
        try {
            const response = await this.client.post('/whatsapp-flows', params);
            console.log('Mensaje con flujo enviado:');
            return response.data as ResponseSendFlow;
        } catch (error) {
            console.error('Error al enviar el mensaje con un flujo:', error);
            throw error;
        }
    }

   // GET https://api-ws.wasapi.io/api/v1/whatsapp-flows/{flow_id}/responses?page=1&per_page=10 consultar las respuestas de un flujo
   async getFlowResponses(params: GetFlowResponses): Promise<ResponseFlowResponses> {
    try {
        const response = await this.client.get(`/whatsapp-flows/${params.flow_id}/responses?page=${params.page}&per_page=${params.per_page}`);
        console.log('Respuestas del flujo cargadas:');
        return response.data as ResponseFlowResponses;
    } catch (error) {
        console.error('Error al cargar las respuestas del flujo:', error);
        throw error;
    }
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-flows/{flow_id}/assets?phone_id={phone_id}  consultar los recursos de un flujo
    async getFlowAssets(params: GetFlowAssets): Promise<GetFlowDetail> {
        try {
            const response = await this.client.post(`/whatsapp-flows/${params.flow_id}/assets?phone_id=${params.phone_id}`);
            console.log('Recursos del flujo cargados:');
            return response.data as GetFlowDetail;
        } catch (error) {   
            console.error('Error al cargar los recursos del flujo:', error);
            throw error;
        }
    }

}   