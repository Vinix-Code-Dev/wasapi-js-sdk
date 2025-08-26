import { AxiosClient } from "./client";
import { BotModule, CampaignsModule, ContactsModule, CustomFieldsModule, FunnelsModule, LabelsModule, MetricsModule, UserModule, WhatsappModule, WorkflowModule } from "./modules";

export interface WasapiConfig {
    apiKey: string;
    baseURL?: string;
    from_id?: number;
}

export class WasapiClient {
    private client: AxiosClient;
    private config: WasapiConfig;
    public campaigns: CampaignsModule;
    public contacts: ContactsModule;
    public customFields: CustomFieldsModule;
    public bot: BotModule;
    public funnels: FunnelsModule;
    public labels: LabelsModule;
    public metrics: MetricsModule;
    public user: UserModule;
    public whatsapp: WhatsappModule;
    public workflow: WorkflowModule;
    
    constructor(config: WasapiConfig | string) {
        if (typeof config === 'string') {
            this.config = { apiKey: config };
        } else {
            this.config = config;
        }
        
        this.client = new AxiosClient(this.config.apiKey, this.config.baseURL);
        this.campaigns = new CampaignsModule(this.client);
        this.contacts = new ContactsModule(this.client);
        this.customFields = new CustomFieldsModule(this.client);
        this.bot = new BotModule(this.client);
        this.funnels = new FunnelsModule(this.client);
        this.labels = new LabelsModule(this.client);
        this.metrics = new MetricsModule(this.client);
        this.user = new UserModule(this.client);
        this.whatsapp = new WhatsappModule(this.client, this.config.from_id);
        this.workflow = new WorkflowModule(this.client);
    }
    
    // Method to get client instance
    public getClient(): AxiosClient {
        return this.client;
    }

    public getConfig(): WasapiConfig {
        return this.config;
    }

    // Method to validate connection
    public async validateConnection(): Promise<boolean> {
        return await this.client.validateConnection();
    }
} 
