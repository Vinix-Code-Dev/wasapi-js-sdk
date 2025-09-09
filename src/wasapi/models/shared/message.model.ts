export interface ChangeStatusParams {
    from_id: number;
    wa_id: string;
    status: 'open' | 'hold' | 'closed';
    message?: string;
    agent_id?: number;
    validate_assigned_status?: 1 | 0;
    send_end_message?: boolean;
}

export interface message extends baseMessage {
    user_id: number;
    sender_id: number;
    from_id: number;
    context_wam_id?: string;
    caption?: string;
    created_at: string;
    updated_at: string;
}

export interface baseMessage {
    id: number;
    message: string;
    type: 'in' | 'out';
    message_type: "text" | "image" | "video" | "audio" | "document" | "location";
    wa_id: string;
    wam_id: string;
    status: string;
}