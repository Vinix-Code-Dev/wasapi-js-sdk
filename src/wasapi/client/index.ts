import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IAxiosClient } from '../interfaces/axiosInterface';
import { WasapiErrorHandler } from '../handler/errorHandler';

export class AxiosClient implements IAxiosClient {
    private api: AxiosInstance;
    private errorHandler: WasapiErrorHandler;

    constructor(apiKey: string, baseURL?: string) {
        // Validate that API key is not empty
        if (!apiKey || apiKey.trim() === '') {
            throw new Error('WasAPI: API key is required and cannot be empty');
        }

        // Set default baseURL if not provided
        const finalBaseURL = baseURL || 'https://api-ws.wasapi.io/api/v1';
        
        // Get error handler instance
        this.errorHandler = WasapiErrorHandler.getInstance();
        
        // Create new axios instance for each client
        this.api = axios.create({
            baseURL: finalBaseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            timeout: 30000, // 30 seconds timeout
        });

        // Setup interceptors for HTTP handling only
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor - just logging
        this.api.interceptors.request.use(
            (config) => {
                this.errorHandler.logRequest(config.method || 'GET', config.url || '');
                return config;
            },
            (error) => {
                this.errorHandler.handleRequestError(error);
                return Promise.reject(error);
            }
        );

        // Response interceptor - delegate error handling
        this.api.interceptors.response.use(
            (response) => {
                this.errorHandler.logResponse(response.status, response.config.url || '');
                return response;
            },
            (error: AxiosError) => {
                this.errorHandler.handleResponseError(error);
                return Promise.reject(error);
            }
        );
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

    // Method to validate connection
    public async validateConnection(): Promise<boolean> {
        try {
            await this.api.get('/user'); // Simple endpoint to validate
            return true;
        } catch (error) {
            return false;
        }
    }
}