//create module for whatsapp

import { AxiosClient } from "../client";

export class WhatsappModule {
    constructor(private client: AxiosClient) { }

    //posthttps://api-ws.wasapi.io/api/v1/whatsapp-messages  params message, wa_id, from_id 
    async sendMessage(message: string, wa_id: string, from_id: string): Promise<any> {
        const response = await this.client.post('/whatsapp-messages', { message, wa_id, from_id });
        console.log(response.data);
        return response.data;
    }
}