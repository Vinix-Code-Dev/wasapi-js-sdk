import { Contact } from "./contact.model";
import { Stage } from "./stage.model";
import { WhatsAppNumber } from "./whatsappnumber.model";


export interface Funnel {
    id: number;
    uuid: string;
    org_id: number;
    whatsapp_number_id: number;
    name: string;
    description: string;
    mark_as_main: boolean;
    created_at: string;
    updated_at: string;
    stages: Stage[];
    whatsapp_number: WhatsAppNumber;
}


export interface FunnelContactStage extends Stage {
    whatsapp_number: WhatsAppNumber;
}

export interface FunnelContact {
    id: number;
    uuid: string;
    funnel_stage_id: number;
    contact_id: number;
    lead_value: number;
    created_at: string;
    updated_at: string;
    contact: Contact;
    stage: FunnelContactStage;
}