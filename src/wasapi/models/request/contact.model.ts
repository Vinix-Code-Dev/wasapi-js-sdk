import { BaseContact } from "../shared/contact.model";

export interface CreateContact extends BaseContact {
    blocked?: boolean;
    unsubscribed?: boolean;
    labels?: number[];
    custom_fields?: Record<string, unknown>;
}

export interface AddLabelContact {
    contact_uuid: string;
    label_id: number[];
}

export interface RemoveLabelContact  extends AddLabelContact{
}

export interface AssingAgentContact {
    contact_uuid: string;
}

export interface SearchContactParams { search?: string; labels?: number; page?: number; }
export interface UpdateContactParams { wa_id: string; data: CreateContact }