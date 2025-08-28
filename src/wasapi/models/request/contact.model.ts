import { BaseContact, ContactCustomField, ContactLabel } from "../shared/contact.model";

export interface CreateContact extends BaseContact {
    blocked?: boolean;
    unsubscribed?: boolean;
    custom_fields?: Record<string, unknown>;
}

export interface UpdateContact {
    first_name?: string;
    last_name?: string;
    email?: string;
    country_code?: string;
    phone?: string;
    notes?: string;
    blocked?: boolean | number; 
    unsubscribed?: boolean | number;
    labels?: ContactLabel[];
    custom_fields?: ContactCustomField[] | Record<string, any>;

}

export interface SearchContactParams { search?: string; labels?: number; page?: number; }
export interface UpdateContactParams { wa_id: string; data: UpdateContact }