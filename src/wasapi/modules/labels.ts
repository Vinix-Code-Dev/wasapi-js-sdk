
import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { ResponseAllLabels, ResponseLabelById } from "../models/response/label.model";
import { CreateLabel } from "../models/request/label.model";
import { ExitResponse } from "../models/response/exit.model";

export class LabelsModule implements IModule {
    constructor(private client: AxiosClient) { }
  // Get https://api-ws.wasapi.io/api/v1/labels consultar todas las etiquetas
    async getAll(): Promise<ResponseAllLabels> {
        try {
            const response = await this.client.get('/labels');
            return response.data as ResponseAllLabels;
        } catch (error) {
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/labels/search Buscar etiquetas por nombre

    async getSearch(name: string): Promise<ResponseLabelById> {
        try {
            const response = await this.client.post('/labels/search', { name });
            return response.data as ResponseLabelById;
        } catch (error) {
            throw error;
        }
    }
    // POST https://api-ws.wasapi.io/api/v1/labels/{id} Obtener una etiqueta por id

    async getById(id: string): Promise<ResponseLabelById> {
        try {
            const response = await this.client.get(`/labels/${id}`);
            return response.data as ResponseLabelById;
        } catch (error) {
            throw error;
        }
    }

    // POST https://api-ws.wasapi.io/api/v1/labels Crear una etiqueta
    async create({title, description, color}: CreateLabel): Promise<ResponseLabelById> {
        const data = {title, description, color}
        try {
            const response = await this.client.post('/labels', data);
            return response.data as ResponseLabelById;
        } catch (error) {
            throw error;
        }
    }
  // PUT https://api-ws.wasapi.io/api/v1/labels/{id} Actualizar una etiqueta
    async update(data: { id: string, data: CreateLabel }): Promise<ResponseLabelById> {
        try {
            const response = await this.client.put(`/labels/${data.id}`, data.data);
            return response.data as ResponseLabelById;
        } catch (error) {
            throw error;
        }
    }

    // DELETE https://api-ws.wasapi.io/api/v1/labels/{id} Eliminar una etiqueta
    async delete(id: string): Promise<ExitResponse> {
        try {
            const response = await this.client.delete(`/labels/${id}`);
            return response.data as ExitResponse;
        } catch (error) {
            throw error;
        }
    }

}