import { message } from "../shared/message.model";
import { Flows } from "../shared/flows.model";
import { WhassappNumberWithApp } from "../shared/whatsappnumber.model";
import { PaginatedResponse } from "./paginatedResponse";
export interface ResponseAllFlows {
    success: boolean;
    data: PhoneFlowData[];
}

export interface PhoneFlowData {
    phone: WhassappNumberWithApp;
    flows: Flows;
    error: string;
    success: boolean;
  }

export interface ResponseSendFlow {
    success: boolean;
    data: message;
}

export type ResponseFlowResponses = PaginatedResponse<any>;