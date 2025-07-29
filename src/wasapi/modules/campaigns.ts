import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { Campaign } from "../models";


export class CampaignsModule implements IModule<Campaign> {
    constructor(private client: AxiosClient) { }

    async getAll(): Promise<Campaign[]> {
        const response = await this.client.get('/campaigns');
        console.log(response.data);
        return response.data;
    }

    async getById(id: string): Promise<Campaign> {
        const response = await this.client.get(`/campaigns/${id}`);
        console.log(response.data);
        return response.data;
    }

    async create(data: any): Promise<Campaign> {
        console.log('Actualmente no esta disponible la creacion de campañas');
        throw new Error('Creación de campañas no implementada');
    }

    async update(data: { id: string, data: any }): Promise<Campaign> {
        console.log('Actualmente no esta disponible la actualizacion de campañas');
        throw new Error('Actualización de campañas no implementada');
    }

    async delete(id: string): Promise<void> {
        console.log('Actualmente no esta disponible la eliminacion de campañas');
        throw new Error('Eliminación de campañas no implementada');
    }
}
