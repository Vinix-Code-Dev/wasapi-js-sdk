import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAxiosClient } from '~/wasapi/interfaces/axiosInterface';


export class AxiosClient implements IAxiosClient {
    private api: AxiosInstance;

    constructor(apiKey: string, baseURL: string = process.env.WASAPI_BASE_URL || 'https://api-ws.wasapi.io/api/v1') {
        this.api = axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get<T>(url, config);
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, data, config);
    }

    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.put<T>(url, data, config);
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.delete<T>(url, config);
    }
}