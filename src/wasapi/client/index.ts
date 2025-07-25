import { AxiosClient } from "~/config";


class WasapiClient {
    private client: AxiosClient;

    constructor(apiKey: string, baseURL?: string) {
        this.client = new AxiosClient(apiKey, baseURL);
    }

    public getAllContacts(): Promise<any> {
        return this.client.get('/contacts');
    }

    // Aquí puedes agregar más métodos específicos de la API
}

export { WasapiClient }; 