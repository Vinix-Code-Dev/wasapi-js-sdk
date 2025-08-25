export interface BotStatusRequest {
    from_id?: number;
    action: 'enable' | 'disable' | 'disable_permanently';
}


