import { AxiosClient } from "./client";
import { BotModule, CampaignsModule, ContactsModule, CustomFieldsModule, FunnelsModule, LabelsModule } from "./modules";



class WasapiClient {
    private client: AxiosClient;
    public campaigns: CampaignsModule;
    public contacts: ContactsModule;
    public customFields: CustomFieldsModule;
    public bot: BotModule;
    public funnels: FunnelsModule;
    public labels: LabelsModule;
    constructor(apiKey: string, baseURL?: string) {
        this.client = new AxiosClient(apiKey, baseURL);
        this.campaigns = new CampaignsModule(this.client);
        this.contacts = new ContactsModule(this.client);
        this.customFields = new CustomFieldsModule(this.client);
        this.bot = new BotModule(this.client);
        this.funnels = new FunnelsModule(this.client);
        this.labels = new LabelsModule(this.client);
    }

}

export { WasapiClient }; 
