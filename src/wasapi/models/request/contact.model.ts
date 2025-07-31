import { BaseContact } from "../shared/contact.model";

export interface CreateContact extends BaseContact {
    blocked?: boolean;
    unsubscribed?: boolean;
    custom_fields?: Record<string, any>;
}