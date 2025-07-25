import { AxiosClient } from "~/config";


class WasapiClient {
    private client: AxiosClient;

    constructor(apiKey: string, baseURL?: string) {
        this.client = new AxiosClient(apiKey, baseURL);
    }

    public async getAllContacts(): Promise<any> {
        console.log('Llamando a getAllContacts...');
        const response = await this.client.get('/contacts');
        console.log('Respuesta recibida:', response.status);
        return response.data;
    }

    // Aquí puedes agregar más métodos específicos de la API
}

export { WasapiClient }; 