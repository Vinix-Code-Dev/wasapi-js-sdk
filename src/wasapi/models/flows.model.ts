export interface SendFlowParams {
    wa_id: string;
    message: string;
    phone_id: number;
    cta: string;
    screen: string;
    flow_id: string;
    action: 'navigate' | 'data_exchange';
}
export interface FlowResponse {
    flow_id: string;
    page?: number;
    per_page?: number;
}
export interface FlowAssets {
    flow_id: string;
    phone_id: number;
}
