export interface WhatsAppNumberBase {
    id: number;
    uuid: string;
    user_id: number;
    app_id: number;
    display_name: string;
    phone_number: string;
    phone_id: string;
    tsp_managed: number;
    meta_app_id: string | null;
    is_business_app: number;
    reply_with_context: number;
    default: number;
    created_at: string;
    updated_at: string;
}

export interface WhatsAppNumber extends WhatsAppNumberBase {
}

export interface WhassappNumberWithApp extends WhatsAppNumberBase {
    app: APP;
}

interface APP {
    id: number;
    uuid: string;
    name: string;
    waba_id: string;
}