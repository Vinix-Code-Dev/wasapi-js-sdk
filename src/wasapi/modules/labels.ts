
import { IModule } from "../interfaces/IModule";
import { AxiosClient } from "../client";
import { CreateLabel, Label } from "../models";

export class LabelsModule implements IModule<Label> {
    constructor(private client: AxiosClient) { }

    async getAll(): Promise<Label[]> {
        const response = await this.client.get('/labels');
        console.log(response.data.labels);
        return response.data.labels;
    }

    async getSearch(name: string): Promise<any> {
        const response = await this.client.post('/labels/search', { name });
        console.log(response.data.data);
        return response.data.data;
    }

    async getById(id: string): Promise<Label> {
        const response = await this.client.get(`/labels/${id}`);
        console.log(response.data);
        return response.data;
    }

    async create(data: CreateLabel): Promise<Label> {
        const response = await this.client.post('/labels', data);
        console.log(response.data);
        return response.data;
    }

    async update(id: string, data: CreateLabel): Promise<Label> {
        const response = await this.client.put(`/labels/${id}`, data);
        console.log(response.data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        const response = await this.client.delete(`/labels/${id}`);
        console.log(response.data);
        return response.data;
    }

}