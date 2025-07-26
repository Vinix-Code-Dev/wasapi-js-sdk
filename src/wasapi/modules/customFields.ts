import { IModule } from "../../interfaces/IModule";
import { AxiosClient } from "../client";
import { CreateCustomField, CustomField } from "../models/customField.model";


export class CustomFieldsModule implements IModule<CustomField> {
    constructor(private client: AxiosClient) { }

    // Obtener todos los custom fields
    async getAll(): Promise<CustomField[]> {
        const response = await this.client.get('/custom-fields');
        console.log(response.data);
        return response.data;
    }

    // Obtener un custom field por ID
    async getById(id: string): Promise<CustomField> {
        throw new Error('No esta disponible en la api');
    }

    // Crear un nuevo custom field
    async create(data: CreateCustomField): Promise<CustomField> {
        const response = await this.client.post('/custom-fields', data);
        console.log(response.data);
        return response.data;
    }

    // Actualizar un custom field existente
    async update(id: string, data: CreateCustomField): Promise<CustomField> {
        const response = await this.client.put(`/custom-fields/${id}`, data);   
        console.log(response.data);
        return response.data;
    }

    // Eliminar un custom field
    async delete(id: string): Promise<void> {
        const response = await this.client.delete(`/custom-fields/${id}`);
        console.log(response.data);
        return response.data;
    }
}
