import { Label } from "./label.model";

 interface CustomField {
  id: number;
  contact_id: number;
  contacts_custom_field_id: number;
  field_value: string;
  field_name: string;
}


export interface CreateContact {
    first_name: string;
    last_name?: string;
    email?: string;
    country_code?: string;
    phone: string;
    notes?: string;
    blocked?: boolean;
    unsubscribed?: boolean;
    labels?: Label[];
    custom_fields?: Record<string, any>;
  }
  
  export interface Contact {
    id: number;
    user_id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    phone: string;
    notes: string;
    blocked: number;
    unsubscribed: number;
    created_at: string;
    updated_at: string;
    nameLabels: string;
    labels: Label[];
    custom_fields: CustomField[];
    funnel_contacts: any[]; 
  }