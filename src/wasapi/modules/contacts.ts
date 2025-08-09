import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllContacts, ResponseContactById } from "../models/response/contact.model";
import { ErrorResponse } from "../models/response/error.model";
import { CreateContact, SearchContactParams, UpdateContactParams } from "../models/request/contact.model";
import { ExitResponse } from "../models/response/exit.model";
import { ExportContactsRequest, isValidExportContactsRequest } from "../validator/exportContacts";



export class ContactsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/contacts consulta todos los contactos
    async getAll(): Promise<ResponseAllContacts> {
        try {
            const response = await this.client.get('/contacts');
            return response.data as ResponseAllContacts;
        } catch (error) {
            console.error('Error al obtener todos los contactos:', error);
            throw error as ErrorResponse;
        }
    }

    // GET https://api-ws.wasapi.io/api/v1/contacts?page={page}&search={search}&labels={labels} consulta los contactos por nombre, email, telefono, etiquetas o paginacion
    async getSearch({search, labels, page}: SearchContactParams): Promise<ResponseAllContacts> {
        try {
            const paramsSearch = new URLSearchParams();
            if (search) paramsSearch.append('search', search);
            if (labels) paramsSearch.append('labels', labels.toString());
            if (page) paramsSearch.append('page', page.toString());
            const response = await this.client.get(`/contacts?${paramsSearch.toString()}`);
            return response.data as ResponseAllContacts;
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
            throw error as ErrorResponse;
        }
    }

    // GET https://api-ws.wasapi.io/api/v1/contacts/{wa_id} consulta un contacto por su uuid
    async getById(wa_id: string): Promise<ResponseContactById> {
        try {
            const response = await this.client.get(`/contacts/${wa_id}`);
            return response.data as ResponseContactById;
        } catch (error) {
            console.error('Error al obtener el contacto:', error);
            throw error as ErrorResponse;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/contacts crea un nuevo contacto
    async create(data: CreateContact): Promise<ResponseContactById> {
        try {
            const response = await this.client.post('/contacts', data);
            return response.data as ResponseContactById;
        } catch (error) {
            console.error('Error al crear el contacto:', error);
            throw error as ErrorResponse;
        }
    }

    // PUT https://api-ws.wasapi.io/api/v1/contacts/{wa_id} actualiza un contacto existente
    async update({ wa_id, data}: UpdateContactParams): Promise<ResponseContactById> {
        try {
            const response = await this.client.put(`/contacts/${wa_id}`, data);
            return response.data as ResponseContactById;
        } catch (error) {
            console.error('Error al actualizar el contacto:', error);
            throw error as ErrorResponse;
        }
    }

    // DELETE https://api-ws.wasapi.io/api/v1/contacts/{wa_id} elimina un contacto existente
    async delete(id: string): Promise<ExitResponse> {
        try {
            const response = await this.client.delete(`/contacts/${id}`);
            return response.data as ExitResponse;
        } catch (error) {
            console.error('Error al eliminar el contacto:', error);
            throw error as ErrorResponse;
        }
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
