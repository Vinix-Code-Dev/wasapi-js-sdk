export interface WhatsAppNumber {
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