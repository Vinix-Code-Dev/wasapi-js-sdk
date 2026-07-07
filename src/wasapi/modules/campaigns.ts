import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllCampaigns, ResponseCampaignById, ResponseCreateCampaign, ResponseCampaignStats, ResponseCampaignLogs } from "../models/response/campaign.model";
import { CreateCampaignRequest, GetCampaignLogsParams } from "../models/request/campaign.model";

export class CampaignsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/campaigns
    async getAll(): Promise<ResponseAllCampaigns> {
        const response = await this.client.get('/campaigns');
        return response.data as ResponseAllCampaigns;
    }

    // GET https://api-ws.wasapi.io/api/v1/campaigns/{campaign_uuid}
    async getById(campaign_uuid: string): Promise<ResponseCampaignById> {
        const response = await this.client.get(`/campaigns/${campaign_uuid}`);
        return response.data as ResponseCampaignById;
    }

    // POST https://api-ws.wasapi.io/api/v1/campaigns
    async create(data: CreateCampaignRequest): Promise<ResponseCreateCampaign> {
        const response = await this.client.post('/campaigns', data);
        return response.data as ResponseCreateCampaign;
    }

    // GET https://api-ws.wasapi.io/api/v1/campaigns/{campaign_uuid}/stats
    async getStats(campaign_uuid: string): Promise<ResponseCampaignStats> {
        const response = await this.client.get(`/campaigns/${campaign_uuid}/stats`);
        return response.data as ResponseCampaignStats;
    }

    // GET https://api-ws.wasapi.io/api/v1/campaigns/{campaign_uuid}/logs
    async getLogs(campaign_uuid: string, params?: GetCampaignLogsParams): Promise<ResponseCampaignLogs> {
        const query = new URLSearchParams();
        if (params?.per_page !== undefined) query.append('per_page', String(params.per_page));
        if (params?.cursor !== undefined) query.append('cursor', params.cursor);
        const qs = query.toString();
        const response = await this.client.get(`/campaigns/${campaign_uuid}/logs${qs ? `?${qs}` : ''}`);
        return response.data as ResponseCampaignLogs;
    }

    async update(data: { id: string, data: any }): Promise<void> {
        throw new Error('Campaign update not implemented');
    }

    async delete(id: string): Promise<void> {
        throw new Error('Deleting unimplemented campaigns');
    }
}
