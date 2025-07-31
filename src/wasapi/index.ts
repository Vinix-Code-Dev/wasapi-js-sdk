import { AxiosClient } from "./client";
import { BotModule, CampaignsModule, ContactsModule, CustomFieldsModule, FunnelsModule, LabelsModule, MetricsModule, UserModule, WhatsappModule, WorkflowModule } from "./modules";



class WasapiClient {
    private client: AxiosClient;
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
    constructor(apiKey: string, baseURL?: string) {
        this.client = AxiosClient.getInstance(apiKey, baseURL);
        this.campaigns = new CampaignsModule(this.client);
        this.contacts = new ContactsModule(this.client);
        this.customFields = new CustomFieldsModule(this.client);
        this.bot = new BotModule(this.client);
        this.funnels = new FunnelsModule(this.client);
        this.labels = new LabelsModule(this.client);
        this.metrics = new MetricsModule(this.client);
        this.user = new UserModule(this.client);
        this.whatsapp = new WhatsappModule(this.client);
        this.workflow = new WorkflowModule(this.client);
    }
    //Metodos para obtener la instancia de Axios y que cumple con el patron singleton

    public getClient(): AxiosClient {
        return this.client;
    }

    public resetClient(): void {
        AxiosClient.resetInstance();
    }

    public static sharesSameAxiosInstance(client1: WasapiClient, client2: WasapiClient): boolean {
        return client1.getClient() === client2.getClient();
    }

    public static getSharedAxiosInstance(): any {
        return AxiosClient.getAxiosInstance();
    }
}

export { WasapiClient }; 
