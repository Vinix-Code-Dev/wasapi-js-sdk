export type ConversationStatus = 'closed' | 'hold' | 'open';
export type CampaignRecipientsType = 'phones' | 'contact_ids' | 'labels' | 'all';

export interface CampaignRecipients {
    type: CampaignRecipientsType;
    /** Required for types: phones, contact_ids, labels. Ignored for 'all'. */
    values?: (string | number)[];
}

export interface CampaignVariables {
    body?: string[];
    header?: string | string[];
    buttons?: string[];
}

export interface CampaignMedia {
    type: 'image' | 'video' | 'document' | 'audio';
    url: string;
    filename?: string;
}

export interface GetCampaignLogsParams {
    /** Results per page. Min 1, max 100. Default 50. */
    per_page?: number;
    /** Opaque cursor from pagination.next_cursor / pagination.prev_cursor. Omit for first page. */
    cursor?: string;
}

export interface CreateCampaignRequest {
    name: string;
    description?: string;
    template_uuid: string;
    phone_id: number;
    recipients: CampaignRecipients;
    variables?: CampaignVariables;
    media?: CampaignMedia;
    /** Format: YYYY-MM-DD HH:mm — in the token owner's timezone. Must be a future date. */
    scheduled_at?: string;
    conversation_status: ConversationStatus;
    disable_chatbot?: boolean;
}
