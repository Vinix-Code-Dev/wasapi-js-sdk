import { Template, TemplateFull } from "../shared/template.model";

export interface ResponseTemplate {
    success: boolean;
    data: Template[];
}


export interface ResponseTemplateById {
    success: boolean;
    data: TemplateFull;
}

export interface ResponseTemplateSyncMeta {
    success: boolean;
    results: AppWasapi[];
}
interface AppWasapi {
    app_id: number;
    app_name: string;
    success: boolean;
    message: string;
    phone_number: string;
    phone_display_name: string;
}