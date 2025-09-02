import { FlowDetail, Screen } from "../shared/flows.model";

export interface SendFlow {
    wa_id: string;
    message: string;
    phone_id?: number;
    cta: string;
    screen: string;
    flow_id: string;
    action?: 'navigate' | 'data_exchange';
}

export interface GetFlowResponses {
    flow_id: string;
    page?: number;
    per_page?: number;
}

export interface GetFlowAssets {
    flow_id: string;
    phone_id?: number;
}


export interface GetFlowDetail {
    success: boolean;
    data: FlowDetailData;
  }
  
  export interface FlowDetailData {
    flow: FlowDetail;
    screens: Screen[];
    data_api: boolean;
  }
  