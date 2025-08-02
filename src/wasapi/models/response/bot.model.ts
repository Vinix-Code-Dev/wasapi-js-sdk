import { Contact } from "./contact.model";

export interface ResponseBotStatus {
    success: boolean;
    data: botContact[];
}


interface botContact extends Contact {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    country_code: string;
    notes: string;
}


