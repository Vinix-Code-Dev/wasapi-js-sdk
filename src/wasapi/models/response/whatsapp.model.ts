import { baseMessage, message } from "../shared/message.model";
import { WhassappNumberWithApp} from "../shared/whatsappnumber.model";
import { PaginatedResponse } from "./paginatedResponse";

export interface ResponseMessageWPP {
  success: boolean;
  data: MessageWPP;
}

export interface ResponseAttachmentWPP {
    success: boolean;
    data: attachmentMessageWPP;
}

export interface MessageWPP extends message {
    chat_status: ChatStatus;
}
interface ChatStatus {
    conversation_status: 'open' | 'hold' | 'closed';
    conversation_expiration: number;

}

export interface attachmentMessageWPP extends message {
    caption?: string;
}


export type ResponseConversation = PaginatedResponse<baseMessage>;


export interface ResponseWhatsappNumbers {
    success: boolean;
    data: WhassappNumberWithApp[];
}

export interface ResponseSendContact {
    success: boolean;
    data: message;
    contacts_sent: number;

}