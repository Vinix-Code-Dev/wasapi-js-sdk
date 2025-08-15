import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllCustomFields, ResponseCustomFieldById } from "../models/response/customField.model";
import { CreateCustomField } from "../models/request/customField.model";


export class CustomFieldsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // Get https://api-ws.wasapi.io/api/v1/custom-fields consultar todos los custom fields
    async getAll(): Promise<ResponseAllCustomFields> {
        const response = await this.client.get('/custom-fields');
        return response.data as ResponseAllCustomFields;
    }

    // Get https://api-ws.wasapi.io/api/v1/custom-fields/{id} consultar un custom field por ID
    async getById(id: string): Promise<ResponseCustomFieldById> {
        throw new Error('Not available in the API');
    }

    // Post https://api-ws.wasapi.io/api/v1/custom-fields Crear un nuevo custom field
    async create({ name }: CreateCustomField): Promise<ResponseCustomFieldById> {
        const response = await this.client.post('/custom-fields', name);
        return response.data as ResponseCustomFieldById;

    }

    // Put https://api-ws.wasapi.io/api/v1/custom-fields/{id} Actualizar un custom field existente
    async update(data: { id: string, data: CreateCustomField }): Promise<ResponseCustomFieldById> {
        const response = await this.client.put(`/custom-fields/${data.id}`, data.data);
        return response.data as ResponseCustomFieldById;

    }

    // Delete https://api-ws.wasapi.io/api/v1/custom-fields/{id} Eliminar un custom field
    async delete(id: string): Promise<any> {
        const response = await this.client.delete(`/custom-fields/${id}`);
        return response.data;
    }
}
