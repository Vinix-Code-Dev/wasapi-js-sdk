import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllCustomFields, ResponseCustomFieldById } from "../models/response/customField.model";
import { CreateCustomField } from "../models/request/customField.model";
import { ExitResponse } from "../models/response/exit.model";


export class CustomFieldsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // Get https://api-ws.wasapi.io/api/v1/custom-fields consultar todos los custom fields
    async getAll(): Promise<ResponseAllCustomFields> {
        try {
            const response = await this.client.get('/custom-fields');
            return response.data as ResponseAllCustomFields;
        } catch (error) {
            console.error('Error al obtener todos los custom fields:', error);
            throw error;
        }
    }

    // Get https://api-ws.wasapi.io/api/v1/custom-fields/{id} consultar un custom field por ID
    async getById(id: string): Promise<ResponseCustomFieldById> {
        throw new Error('No esta disponible en la api');
    }

    // Post https://api-ws.wasapi.io/api/v1/custom-fields Crear un nuevo custom field
    async create({name}: CreateCustomField): Promise<ResponseCustomFieldById> {
        try {
            const response = await this.client.post('/custom-fields', name);
            return response.data as ResponseCustomFieldById;
        } catch (error) {
            console.error('Error al crear el custom field:', error);
            throw error;
        }
    }

    // Put https://api-ws.wasapi.io/api/v1/custom-fields/{id} Actualizar un custom field existente
    async update(data: { id: string, data: CreateCustomField }): Promise<ResponseCustomFieldById> {
        try {
            const response = await this.client.put(`/custom-fields/${data.id}`, data.data);
            return response.data as ResponseCustomFieldById;
        } catch (error) {
            console.error('Error al actualizar el custom field:', error);
            throw error;
        }
    }

    // Delete https://api-ws.wasapi.io/api/v1/custom-fields/{id} Eliminar un custom field
    async delete(id: string): Promise<ExitResponse> {
        try {
            const response = await this.client.delete(`/custom-fields/${id}`);
            return response.data as ExitResponse;
        } catch (error) {
            console.error('Error al eliminar el custom field:', error);
            throw error;
        }
    }
}
