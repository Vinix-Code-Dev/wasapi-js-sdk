import { AxiosClient } from "../client";
import { UserResponse } from "../models/response/user.model";

export class UserModule {
    constructor(private client: AxiosClient) { }

    //GET https://api-ws.wasapi.io/api/v1/user obtener el usuario MANAGER de la cuenta
    async getUser(): Promise<UserResponse> {
        try {
            const response = await this.client.get('/user');
            return response.data as UserResponse;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw error;
        }
    }
}