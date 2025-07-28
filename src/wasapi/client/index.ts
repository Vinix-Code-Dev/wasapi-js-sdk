import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAxiosClient } from '~/wasapi/interfaces/axiosInterface';


export class AxiosClient implements IAxiosClient {
    private static instance: AxiosClient | null = null;
    private static axiosInstance: AxiosInstance | null = null;
    private api: AxiosInstance;

    private constructor(apiKey: string, baseURL: string = process.env.WASAPI_BASE_URL || 'https://api-ws.wasapi.io/api/v1') {
        // Singleton para Axios - solo una instancia de axios en toda la app
        if (!AxiosClient.axiosInstance) {
            AxiosClient.axiosInstance = axios.create({
                baseURL,
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
        }
        this.api = AxiosClient.axiosInstance;
    }

    public static getInstance(apiKey: string, baseURL?: string): AxiosClient {
        if (!AxiosClient.instance) {
            AxiosClient.instance = new AxiosClient(apiKey, baseURL);
        }
        return AxiosClient.instance;
    }

    public static resetInstance(): void {
        AxiosClient.instance = null;
        AxiosClient.axiosInstance = null;
    }

    public static getAxiosInstance(): AxiosInstance | null {
        return AxiosClient.axiosInstance;
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