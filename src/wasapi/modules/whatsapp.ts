import { AxiosClient } from "../client";
import { ChangeStatusParams } from "../models/shared/message.model";
import { SendContact } from "../models/request/contactWpp.model";
import { SendTemplate } from "../models/request/template.model";
import { ResponseAttachmentWPP, ResponseConversation, ResponseMessageWPP, ResponseSendContact, ResponseWhatsappNumbers } from "../models/response/whatsapp.model";
import { SendAttachment, SendAttachmentParams, SendMessage } from "../models/request/message.model";
import { ResponseTemplate, ResponseTemplateById, ResponseTemplateSyncMeta } from "../models/response/template.model";
import { ResponseAllFlows, ResponseFlowResponses, ResponseSendFlow } from "../models/response/flow.model";
import { GetFlowAssets, GetFlowDetail, GetFlowResponses, SendFlow } from "../models/request/flow.model";
import { getFileType, getTemplateFileType } from "../helpers/fileType.helper";
import { Template } from "../models/shared/template.model";


export class WhatsappModule {
    private defaultFromId?: number;

    constructor(private client: AxiosClient, defaultFromId?: number) {
        this.defaultFromId = defaultFromId;
    }

    //posthttps://api-ws.wasapi.io/api/v1/whatsapp-messages 
    async sendMessage({ from_id, wa_id, message }: SendMessage): Promise<ResponseMessageWPP> {
        const params = { 
            from_id: from_id || this.defaultFromId, 
            wa_id, 
            message 
        };
        const response = await this.client.post('/whatsapp-messages', params);
        return response.data as ResponseMessageWPP;
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/attachment enviar un archivo multimedia a whatsapp
    async sendAttachment({ from_id, wa_id, filePath, caption, filename }: SendAttachmentParams): Promise<ResponseAttachmentWPP> {
        const fileType = getFileType(filePath);
        const payload: SendAttachment = {
            from_id: from_id || this.defaultFromId,
            wa_id,
            file: fileType,
            [fileType]: filePath,
            ...(caption ? { caption } : {}),
            ...(filename ? { filename } : {})
        }
        const response = await this.client.post('/whatsapp-messages/attachment', payload);
        return response.data as ResponseAttachmentWPP;
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/send-template
    // Enviar mensaje de plantilla de WhatsApp soporte hasta 20 destinarios por envio
    async sendTemplate({ recipients, template_id, contact_type, from_id, url_file, ...options }: SendTemplate): Promise<ResponseTemplate> {
        const fileType = url_file ? getTemplateFileType(url_file) : undefined;     
        const params = { 
            recipients, 
            template_id, 
            contact_type, 
            from_id: from_id || this.defaultFromId, 
            file: fileType,
            url_file,
            ...options 
        };
        const response = await this.client.post('/whatsapp-messages/send-template', params);
        return response.data as ResponseTemplate;
    }

    // get https://api-ws.wasapi.io/api/v1/whatsapp-messages/{wa_id} cargar la conversacion de whatsapp con wa_id y from_id
    async getConversation(params: { wa_id: string, from_id?: number, page?: number }): Promise<ResponseConversation> {

        const response = await this.client.get(`/whatsapp-messages/${params.wa_id}?from_id=${params.from_id}&page=${params.page}`);
        return response.data as ResponseConversation;
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-numbers consultar lineas de whatsapp de mi cuenta wasapi 
    async getWhatsappNumbers(): Promise<ResponseWhatsappNumbers> {
        const response = await this.client.get('/whatsapp-numbers');
        return response.data as ResponseWhatsappNumbers;
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-templates consultar plantillas de whatsapp
    async getWhatsappTemplates(): Promise<ResponseTemplate> {
        const response = await this.client.get('/whatsapp-templates');
        return response.data as ResponseTemplate;
    }
    async getTemplatesByAppId({from_id}: {from_id: number}): Promise<Template[]> {
       const templates = await this.getWhatsappTemplates();
       const templatesByPhoneId = templates.data.filter((template: any) => template.id === from_id);
       if(templatesByPhoneId.length === 0) {
        return [];
       }
       return templatesByPhoneId;
    }

    async getFieldsTemplate(template_uuid: string): Promise<any> {
        const response = await this.client.get(`/make/template-fields/${template_uuid}`);
        return response.data;
    }

    //https://api-ws.wasapi.io/api/v1/whatsapp-templates/{template_uuid} consultar una plantilla de whatsapp
    async getWhatsappTemplate(data: { template_uuid: string }): Promise<ResponseTemplateById> {
        const response = await this.client.get(`/whatsapp-templates/${data.template_uuid}`);
        return response.data as ResponseTemplateById;
    }

    // https://api-ws.wasapi.io/api/v1/whatsapp-templates/sync-meta sincronizar plantillas de meta con wasapi
    async syncMetaTemplates(): Promise<ResponseTemplateSyncMeta> {
        const response = await this.client.get('/whatsapp-templates/sync-meta');
        return response.data as ResponseTemplateSyncMeta;
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/change-status cambia el estado de una conversacion o la trasfiere a nuevo agente de chat
    async changeStatus({ from_id, wa_id, status, message, ...options }: ChangeStatusParams): Promise<any> {
        const params = { 
            from_id: from_id || this.defaultFromId, 
            wa_id, 
            status, 
            message, 
            ...options 
        }
        const response = await this.client.post('/whatsapp-messages/change-status', params);
        return response.data;
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-messages/send-contacts
    async sendContacts({ wa_id, from_id, context_wam_id, contacts }: SendContact): Promise<ResponseSendContact> {
        const params = { 
            wa_id, 
            from_id: from_id || this.defaultFromId, 
            context_wam_id, 
            contacts 
        }
        const response = await this.client.post('/whatsapp-messages/send-contacts', params);
        return response.data as ResponseSendContact;
    }

    // GET https://api-ws.wasapi.io/api/v1/whatsapp-flows
    async getFlows(): Promise<ResponseAllFlows> {
        const response = await this.client.get('/whatsapp-flows');
        return response.data as ResponseAllFlows;
    }
   // return the published flows of a phone
    async getFlowsByPhoneId(from_id?: number): Promise<any> {
        const phone_id = from_id || this.defaultFromId;
        const status = 'PUBLISHED';
        const flows = await this.getFlows();
        const phone = flows.data.find(phone => phone.phone.id === phone_id);
        if (!phone) {
            return []
        }
        const publishedFlows = phone?.flows.data.filter(flow => flow.status === status);
        return publishedFlows;
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-flows enviar un mensaje con un flujo
    async sendFlow({ wa_id, message, phone_id, cta, screen, flow_id, action }: SendFlow): Promise<ResponseSendFlow> {
        const params = { wa_id, message, phone_id: phone_id || this.defaultFromId, cta, screen, flow_id, action: action || 'navigate' }
        const response = await this.client.post('/whatsapp-flows', params);
        return response.data as ResponseSendFlow;

    }

    // GET https://api-ws.wasapi.io/api/v1/whatsapp-flows/{flow_id}/responses?page=1&per_page=10 consultar las respuestas de un flujo
    async getFlowResponses({ flow_id, page, per_page }: GetFlowResponses): Promise<ResponseFlowResponses> {
        const response = await this.client.get(`/whatsapp-flows/${flow_id}/responses?page=${page}&per_page=${per_page}`);
        return response.data as ResponseFlowResponses;
    }

    // POST https://api-ws.wasapi.io/api/v1/whatsapp-flows/{flow_id}/assets?phone_id={phone_id}  consultar los recursos de un flujo
    async getFlowAssets({ flow_id, phone_id }: GetFlowAssets): Promise<GetFlowDetail> {
        const from_id = phone_id || this.defaultFromId;
        const response = await this.client.post(`/whatsapp-flows/${flow_id}/assets?phone_id=${from_id}`);
        return response.data as GetFlowDetail;
    }
     // return the screens of a flow
    async getFlowScreens({ flow_id, phone_id }: GetFlowAssets): Promise<any> {
        const assets = await this.getFlowAssets({ flow_id, phone_id });
        return assets.data.screens;
    }

}   