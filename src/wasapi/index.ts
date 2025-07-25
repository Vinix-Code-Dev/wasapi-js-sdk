import { AxiosClient } from "./client";
import { CreateContact } from "./models";

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

    //GET /contacts
    public async getAllContacts(): Promise<any> {

        const response = await this.client.get('/contacts');
        return response.data;
    }
    //POST /contacts
    public async createContact(contact: CreateContact): Promise<any> {
        const response = await this.client.post('/contacts', contact);
        return response.data;
    }

    //PUT /
    // Aquí puedes agregar más métodos específicos de la API
}

export { WasapiClient }; 
