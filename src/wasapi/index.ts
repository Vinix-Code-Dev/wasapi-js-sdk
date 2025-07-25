import { AxiosClient } from "./client";

class WasapiClient {
    private client: AxiosClient;

    constructor(apiKey: string, baseURL?: string) {
        this.client = new AxiosClient(apiKey, baseURL);
    }

    //GET /campaigns
    public async getAllCampaigns(): Promise<any> {
        const response = await this.client.get('/campaigns');
        return response.data;
    }

    //GET /campaigns/{campaign_id}
    public async getCampaignById(campaignId: string): Promise<any> {
        const response = await this.client.get(`/campaigns/${campaignId}`);
        return response.data;
    }

    public async getAllContacts(): Promise<any> {

        const response = await this.client.get('/contacts');
        return response.data;
    }

    // Aquí puedes agregar más métodos específicos de la API
}

export { WasapiClient }; 
