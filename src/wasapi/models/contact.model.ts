 interface CustomField {
  id: number;
  contact_id: number;
  contacts_custom_field_id: number;
  field_value: string;
  field_name: string;
}

interface ContactLabel {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  color: string;
  created_at: string;
  updated_at: string;
  pivot: {
    contact_id: number;
    label_id: number;
  };
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
    labels?: ContactLabel[];
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
    labels: ContactLabel[];
    custom_fields: CustomField[];
    funnel_contacts: any[]; 
  }