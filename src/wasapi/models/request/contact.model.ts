import { BaseContact } from "../shared/contact.model";

export interface CreateContact extends BaseContact {
    blocked?: boolean;
    unsubscribed?: boolean;
    custom_fields?: Record<string, unknown>;
}

export interface SearchContactParams { search?: string; labels?: number; page?: number; }
export interface UpdateContactParams { wa_id: string; data: CreateContact }