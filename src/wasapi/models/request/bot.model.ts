export interface BotStatusRequest {
    from_id: number;
    action: 'enable' | 'disable' | 'disable_permanently';
}


export interface BotStatusParams {
    wa_id: string;
    data: BotStatusRequest;
}