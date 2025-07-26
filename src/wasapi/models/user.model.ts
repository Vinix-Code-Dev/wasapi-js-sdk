export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | string; 
    organization_id: number;
    phone: string;
    lang: string;
    phone_country: string;
    active: number;
    blocked: number;
    created_at: string; 
    updated_at: string;
    last_login_at: string; 
}