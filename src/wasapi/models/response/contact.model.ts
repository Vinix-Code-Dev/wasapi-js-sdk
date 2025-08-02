import { BaseContact, ContactCustomField } from "../shared/contact.model";
import { FunnelContactStage } from "../shared/funnel.model";
import { PaginatedResponse, ResponseById } from "./paginatedResponse";

export interface Contact extends BaseContact {
    id: number;
    user_id: number;
    uuid: string;
    blocked: number;
    unsubscribed: number;
    created_at: string;
    updated_at: string;
    nameLabels: string;
    custom_fields: ContactCustomField[];
    funnel_contacts?: FunnelContactStage[]; // TODO: cambiar a FunnelContact
}
// response para obtener todos los contactos
export type ResponseAllContacts = PaginatedResponse<Contact>;

// response para obtener un contacto por su id
export type ResponseContactById = ResponseById<Contact>;