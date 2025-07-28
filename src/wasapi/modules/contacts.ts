import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { Contact, CreateContact, ExportContactsRequest, isValidExportContactsRequest } from "../models";



export class ContactsModule implements IModule<Contact> {
    constructor(private client: AxiosClient) { }

    async getAll(): Promise<Contact[]> {
        const response = await this.client.get('/contacts');
        console.log(response.data);
        return response.data;
    }

    async getSearch(params: { search?: string, labels?: number, page?: number }): Promise<Contact> {
        const paramsSearch = new URLSearchParams();
        if (params.search) paramsSearch.append('search', params.search);
        if (params.labels) paramsSearch.append('labels', params.labels.toString());
        if (params.page) paramsSearch.append('page', params.page.toString());
        const response = await this.client.get(`/contacts?${paramsSearch.toString()}`);
        console.log(response.data.data);
        return response.data.data;
    }

    async getById(contactUuid: string): Promise<Contact> {
        const response = await this.client.get(`/contacts/${contactUuid}`);
        console.log(response.data);
        return response.data;
    }

    async create(data: CreateContact): Promise<Contact> {
        const response = await this.client.post('/contacts', data);
        console.log(response.data);
        return response.data;
    }

    async update(data: { contactUuid: string, data: CreateContact }): Promise<Contact> {
        const response = await this.client.put(`/contacts/${data.contactUuid}`, data.data);
        console.log(response.data);
        return response.data;
    }

    async delete(contactUuid: string): Promise<void> {
        const response = await this.client.delete(`/contacts/${contactUuid}`);
        console.log(response.data);
        return response.data;
    }

    /**
     * Exporta los contactos del sistema y los envía por correo electrónico
     * @param data - Datos de exportación con emails de destino
     * @returns Promise<void>
     */
    async export(data: ExportContactsRequest): Promise<void> {
        // Validar la solicitud antes de enviarla
        if (!isValidExportContactsRequest(data)) {
            throw new Error('Solicitud de exportación inválida: máximo 5 correos electrónicos válidos permitidos');
        }

        const response = await this.client.post('/export-contacts', data);
        return response.data;
    }
}
