import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllCampaigns, ResponseCampaignById } from "../models/response/campaign.model";
import { ErrorResponse } from "../models/response/error.model";



export class CampaignsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/campaigns consulta todas las campañas
    async getAll(): Promise<ResponseAllCampaigns> {
        try {
            const response = await this.client.get('/campaigns');
            return response.data as ResponseAllCampaigns;
        } catch (error) {
            console.error('Error al obtener todas las campañas:', error);
            throw error as ErrorResponse;
        }
    }

    // GET https://api-ws.wasapi.io/api/v1/campaigns/{campaign_id} consulta una campaña por su id
    async getById(campaign_id: string): Promise<ResponseCampaignById> {
        try {
            const response = await this.client.get(`/campaigns/${campaign_id}`);
            return response.data as ResponseCampaignById;
        } catch (error) {
            console.error('Error al obtener la campaña:', error);
            throw error as ErrorResponse;
        }
    }

    async create(data: any): Promise<void> {
        //console.log('Actualmente no esta disponible la creacion de campañas');
        throw new Error('Creación de campañas no implementada');
    }

    async update(data: { id: string, data: any }): Promise<void> {
        console.log('Actualmente no esta disponible la actualizacion de campañas');
        throw new Error('Actualización de campañas no implementada');
    }

    async delete(id: string): Promise<void> {
        console.log('Actualmente no esta disponible la eliminacion de campañas');
        throw new Error('Eliminación de campañas no implementada');
    }
}
