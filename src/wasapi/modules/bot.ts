import { AxiosClient } from "../client";
import { BotStatusRequest } from "../models/request/bot.model";
import { ResponseBotStatus } from "../models/response/bot.model";


export class BotModule {
    constructor(private client: AxiosClient) { }

    async toggleStatus(data: {wa_id: string, data: BotStatusRequest}): Promise<ResponseBotStatus> {
        try {
            const response = await this.client.post(`/contacts/${data.wa_id}/toggle-bot`, data.data);
            console.log('Estado del bot cambiado:');
            return response.data as ResponseBotStatus;
        } catch (error) {
            console.error('Error al cambiar el estado del bot:', error);
            throw error;
        }
    }
}