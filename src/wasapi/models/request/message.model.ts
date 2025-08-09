export interface SendMessage {
    message: string;
    wa_id: string;
    from_id?: string;
}

export interface SendAttachment {
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

export interface SendAttachmentParams {
    from_id: string;
    wa_id: string;
    filePath: string;
    caption?: string;
    filename?: string;
}