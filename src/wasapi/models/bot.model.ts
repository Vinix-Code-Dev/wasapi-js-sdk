
interface BotStatusRequest {
    from_id?: string;
    action: 'enable' | 'disable' | 'disable_permanently';
}

export { BotStatusRequest };
