import { AxiosClient } from "../client";
import { BotStatusParams } from "../models/request/bot.model";
import { ResponseBotStatus } from "../models/response/bot.model";


export class BotModule {
    constructor(private client: AxiosClient) { }

    async toggleStatus({ wa_id, data }: BotStatusParams): Promise<ResponseBotStatus> {
        const response = await this.client.post(`/contacts/${wa_id}/toggle-bot`, data);
        return response.data as ResponseBotStatus;
    }
}