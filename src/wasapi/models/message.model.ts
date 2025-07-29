export interface SendMessageParams {
    message: string;
    wa_id: string;
    from_id?: string;
}

export interface SendAttachmentParams {
    from_id: number;
    wa_id: string;
    file: 'image_url' | 'video_url' | 'document_url' | 'audio_url';
    image_url?: string;
    video_url?: string;
    document_url?: string;
    audio_url?: string;
    caption?: string;
    filename?: string;
}