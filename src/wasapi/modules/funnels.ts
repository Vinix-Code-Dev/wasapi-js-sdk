import { AxiosClient } from "../client";
import { ResponseAllFunnels, ResponseMoveContactToFunnel, ResponseSearchContactFunnel } from "../models/response/funnel.model";



export class FunnelsModule {
    constructor(private client: AxiosClient) { }
    // Get https://api-ws.wasapi.io/api/v1/funnels consultar todos los funnels
    async getAll(): Promise<ResponseAllFunnels> {
        const response = await this.client.get('/funnels');
        return response.data as ResponseAllFunnels;
    }
    //GET https://api-ws.wasapi.io/api/v1/funnels/contacts/search buscar contacto en funnel 
    /**
     * Busca contactos en funnels
     * @param phoneNumber -  numero de telefono (opcional)
     * @param contactUuid - uuuid unico del contacto (opcional)
     * @returns Promise<any>
     */
    async searchContact(params: { phoneNumber?: string, contactUuid?: string }): Promise<ResponseSearchContactFunnel> {
        const paramsSearch = new URLSearchParams();
        if (params.phoneNumber) paramsSearch.append('phone', params.phoneNumber);
        if (params.contactUuid) paramsSearch.append('contact_uuid', params.contactUuid);

        const response = await this.client.get(`/funnels/contacts/search?${paramsSearch.toString()}`);
        return response.data as ResponseSearchContactFunnel;
    }

    //POST https://api-ws.wasapi.io/api/v1/funnels/stage/move-contact mover contacto a otro funnel
    async moveContactToFunnel(params: { funnelContactId: number, toStageId: number }): Promise<ResponseMoveContactToFunnel> {
        const response = await this.client.post(`/funnels/stage/move-contact`, { contact_id: params.funnelContactId, to_stage_id: params.toStageId });
        return response.data as ResponseMoveContactToFunnel;

    }


}   