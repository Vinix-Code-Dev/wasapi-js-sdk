import { AxiosError } from 'axios';

export class WasapiErrorHandler {
    private static instance: WasapiErrorHandler;
    
    private constructor() {}
    
    public static getInstance(): WasapiErrorHandler {
        if (!WasapiErrorHandler.instance) {
            WasapiErrorHandler.instance = new WasapiErrorHandler();
        }
        return WasapiErrorHandler.instance;
    }
    
    public handleRequestError(error: any): void {
        console.error('❌ WasAPI Request Error:', error);
    }
    
    public handleResponseError(error: AxiosError): void {
        if (error.response) {
            const { status, data } = error.response;
            
            switch (status) {
                case 401:
                    console.error('🔐 WasAPI Error: Invalid or expired API key');
                    console.error('   Status:', status);
                    console.error('   Response:', data);
                    break;
                case 403:
                    console.error('🚫 WasAPI Error: Access denied - check your API key permissions');
                    console.error('   Status:', status);
                    console.error('   Response:', data);
                    break;
                case 429:
                    console.error('⏰ WasAPI Error: Rate limit exceeded - too many requests');
                    console.error('   Status:', status);
                    console.error('   Response:', data);
                    break;
                case 500:
                    console.error('💥 WasAPI Error: Internal server error');
                    console.error('   Status:', status);
                    console.error('   Response:', data);
                    break;
                default:
                    console.error(`❌ WasAPI Error: ${status} - ${error.message}`);
                    console.error('   Response:', data);
            }
        } else if (error.request) {
            console.error('🌐 WasAPI Error: Could not connect to server');
            console.error('   Request:', error.request);
        } else {
            console.error('❌ WasAPI Error:', error.message);
        }
    }
    
    public logRequest(method: string, url: string): void {
        console.log(`🚀 WasAPI Request: ${method.toUpperCase()} ${url}`);
    }
    
    public logResponse(status: number, url: string): void {
        console.log(`✅ WasAPI Response: ${status} ${url}`);
    }
}
