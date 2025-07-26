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
    async searchContact(phoneNumber?: string, contactUuid?: string): Promise<FunnelContact> {
        const params = new URLSearchParams();
        if (phoneNumber) params.append('phone', phoneNumber);
        if (contactUuid) params.append('contact_uuid', contactUuid);

        const response = await this.client.get(`/funnels/contacts/search?${params.toString()}`);
        console.log(response.data.data);
        return response.data.data as FunnelContact;
    }

    //mover contacto a otro funnel
    async moveContactToFunnel(contactUuid: string, toStageUuid: string): Promise<any> {
        const response = await this.client.post(`/funnels/stage/move-contact`, { contact_id: contactUuid, to_stage_id: toStageUuid });
        console.log(response.data);
        return response.data;
    }


}   