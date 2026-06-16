export interface ConversationLabel {
    id: number;
    color: string;
    title: string;
    agent_required: boolean;
}

export interface Conversation {
    wa_id: string;
    from_id: number;
    contact_id: number | null;
    contact_first_name: string | null;
    contact_last_name: string | null;
    contact_email: string | null;
    contact_uuid: string | null;
    message: string;
    message_type: string;
    type: 'in' | 'out';
    conversation_status: 'open' | 'hold' | 'closed';
    conversation_expiration: number | null;
    unread_count: number;
    created_at: string;
    updated_at: string;
    labels: ConversationLabel[];
}

export interface ConversationPagination {
    has_more: boolean;
    next_cursor: string | null;
    prev_cursor: string | null;
}

export interface ResponseConversations {
    success: boolean;
    data: Conversation[];
    pagination: ConversationPagination;
}
