import { Funnel, FunnelContact } from "../shared/funnel.model";

export interface ResponseAllFunnels {
    success: boolean;
    data: Funnel[];
}

export interface ResponseSearchContactFunnel {
    menssage: string;
    data: FunnelContact;
}

interface moveContactToFunnel {
    id: number;
    uuid: string;
    funnel_stage_id: number;
    contact_id: number;
    lead_value: number;
    created_at: string;
    updated_at: string;
}

export interface ResponseMoveContactToFunnel {
    success: boolean;
    data: moveContactToFunnel;
}