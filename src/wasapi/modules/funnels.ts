import { AxiosClient } from "../client";
import { Funnel, FunnelContact } from "../models";



export class FunnelsModule {
    constructor(private client: AxiosClient) { }

    async getAll(): Promise<Funnel[]> {
        const response = await this.client.get('/funnels');
        console.log(response.data);
        return response.data;
    }
    //buscar contacto en funnel 
    /**
     * Busca contactos en funnels
     * @param phoneNumber -  numero de telefono (opcional)
     * @param contactUuid - uuuid unico del contacto (opcional)
     * @returns Promise<any>
     */
    async searchContact(params: { phoneNumber?: string, contactUuid?: string }): Promise<FunnelContact> {
        const paramsSearch = new URLSearchParams();
        if (params.phoneNumber) paramsSearch.append('phone', params.phoneNumber);
        if (params.contactUuid) paramsSearch.append('contact_uuid', params.contactUuid);

        const response = await this.client.get(`/funnels/contacts/search?${params.toString()}`);
        console.log(response.data.data);
        return response.data.data as FunnelContact;
    }

    //mover contacto a otro funnel
    async moveContactToFunnel(params: { contactUuid: string, toStageUuid: string }): Promise<any> {
        const response = await this.client.post(`/funnels/stage/move-contact`, { contact_id: params.contactUuid, to_stage_id: params.toStageUuid });
        console.log(response.data);
        return response.data;
    }


}   