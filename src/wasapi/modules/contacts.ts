import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllContacts, ResponseContactById } from "../models/response/contact.model";
import { CreateContact, SearchContactParams, UpdateContactParams } from "../models/request/contact.model";
import { ExportContactsRequest, isValidExportContactsRequest } from "../validator/exportContacts";



export class ContactsModule implements IModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/contacts consulta todos los contactos
    async getAll(): Promise<ResponseAllContacts> {
        const response = await this.client.get('/contacts');
        return response.data as ResponseAllContacts;
    }

    // GET https://api-ws.wasapi.io/api/v1/contacts?page={page}&search={search}&labels={labels} consulta los contactos por nombre, email, telefono, etiquetas o paginacion
    async getSearch({ search, labels, page }: SearchContactParams): Promise<ResponseAllContacts> {
        const paramsSearch = new URLSearchParams();
        if (search) paramsSearch.append('search', search);
        if (labels) paramsSearch.append('labels', labels.toString());
        if (page) paramsSearch.append('page', page.toString());
        const response = await this.client.get(`/contacts?${paramsSearch.toString()}`);
        return response.data as ResponseAllContacts;
    }

    // GET https://api-ws.wasapi.io/api/v1/contacts/{wa_id} consulta un contacto por su wa_id
    async getById(wa_id: string): Promise<ResponseContactById> {
        const response = await this.client.get(`/contacts/${wa_id}`);
        return response.data as ResponseContactById;

    }

    // POST https://api-ws.wasapi.io/api/v1/contacts crea un nuevo contacto
    async create({ first_name, last_name, email, country_code, phone, ...options }: CreateContact): Promise<ResponseContactById> {
        const data = { first_name, last_name, email, country_code, phone, ...options }
        const response = await this.client.post('/contacts', data);
        return response.data as ResponseContactById;
    }

    // PUT https://api-ws.wasapi.io/api/v1/contacts/{wa_id} actualiza un contacto existente
    async update({ wa_id, data }: UpdateContactParams): Promise<ResponseContactById> {
        const response = await this.client.put(`/contacts/${wa_id}`, data);
        return response.data as ResponseContactById;
    }

    // DELETE https://api-ws.wasapi.io/api/v1/contacts/{wa_id} elimina un contacto existente
    async delete(wa_id: string): Promise<any> {
        const response = await this.client.delete(`/contacts/${wa_id}`);
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
            throw new Error('Invalid export request: maximum 5 valid emails allowed');
        }

        const response = await this.client.post('/export-contacts', data);
        return response.data;
    }
}
