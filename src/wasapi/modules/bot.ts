import { AxiosClient } from "../client";
import { BotStatusRequest } from "../models/request/bot.model";
import { ResponseBotStatus } from "../models/response/bot.model";


export class BotModule {
    constructor(private client: AxiosClient) { }

    async toggleStatus(data: { wa_id: string, data: BotStatusRequest }): Promise<ResponseBotStatus> {
        const response = await this.client.post(`/contacts/${data.wa_id}/toggle-bot`, data.data);
        return response.data as ResponseBotStatus;
    }
}