import { AxiosClient } from "../client";
import { BotStatusRequest } from "../models";


export class BotModule {
    constructor(private client: AxiosClient) { }

    async toggleStatus(wa_id: string, data: BotStatusRequest): Promise<void> {
        const response = await this.client.post(`/contacts/${wa_id}/toggle-bot`, data);
        console.log(response.data);
        return response.data;
    }
}