export interface TemplateVariable {
    text: string;
    val: string | number;
}

export interface SendTemplateParams {
    recipients: string;
    template_id: string;
    contact_type: 'phone' | 'contact';
    from_id?: number;
    file?: 'document' | 'video' | 'image' | 'audio';
    url_file?: string;
    file_name?: string;
    body_vars?: TemplateVariable[];
    header_var?: TemplateVariable[];
    cta_var?: TemplateVariable[];
    chatbot_status?: 'enable' | 'disable' | 'disable_permanently';
    conversation_status?: 'open' | 'hold' | 'closed' | 'unchanged';
}