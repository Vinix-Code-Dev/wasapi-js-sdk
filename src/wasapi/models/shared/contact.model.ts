export interface ContactLabel {
  id: number;
  user_id: number;
  title: string;
  description: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CustomField {
  id: number;
  contact_id: number;
  contacts_custom_field_id: number;
  field_value: string;
  field_name: string;
}

export interface BaseContact {
  first_name: string;
  last_name?: string;
  email?: string;
  country_code?: string;
  phone: string;
  notes?: string;
  blocked?: boolean | number; 
  unsubscribed?: boolean | number;
  labels?: ContactLabel[];
  custom_fields?: CustomField[] | Record<string, any>;
}
