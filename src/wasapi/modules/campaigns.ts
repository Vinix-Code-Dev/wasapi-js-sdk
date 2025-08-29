import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllCampaigns, ResponseCampaignById } from "../models/response/campaign.model";



export class CampaignsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/campaigns consulta todas las campañas
    async getAll(): Promise<ResponseAllCampaigns> {
        const response = await this.client.get('/campaigns');
        return response.data as ResponseAllCampaigns;
    }

    // GET https://api-ws.wasapi.io/api/v1/campaigns/{campaign_id} consulta una campaña por su uuid (campaign_id)
    async getById(campaign_id: string): Promise<ResponseCampaignById> {
        const response = await this.client.get(`/campaigns/${campaign_id}`);
        return response.data as ResponseCampaignById;
    }

    async create(data: any): Promise<void> {
        throw new Error('Campaign creation not implemented');
    }

    async update(data: { id: string, data: any }): Promise<void> {
        throw new Error('Campaign update not implemented');
    }

    async delete(id: string): Promise<void> {
        throw new Error('Deleting unimplemented campaigns');
    }
}
