//create module for user

import { AxiosClient } from "../client";
import { User } from "../models";

export class UserModule {
    constructor(private client: AxiosClient) { }

    //usuario de la cuenta  
    async getUser(): Promise<User> {
        const response = await this.client.get('/user');
        console.log(response.data);
        return response.data;
    }
}