//create module for whatsapp

import { AxiosClient } from "../client";


export class WhatsappModule {
    constructor(private client: AxiosClient) { }

    //posthttps://api-ws.wasapi.io/api/v1/whatsapp-messages  params message, wa_id, from_id  crea un try catch para manejar el error
    async sendMessage(params: { message: string, wa_id: string, from_id: string }): Promise<any> {
        try {
            const response = await this.client.post('/whatsapp-messages', params);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            throw error;
        }
    }
}