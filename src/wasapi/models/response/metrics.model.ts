import { OnlineAgent } from "../shared/metrics.model";

export interface OnlineAgentsResponse {
    success: boolean;
    users: OnlineAgent[];
  }

  export interface TotalCampaignsResponse {
    success: boolean;
    data: TotalCampaigns;
  }

  export interface TotalCampaigns {
    total: number;
  }

  export interface ConsolidatedConversationsResponse {
    success: boolean;
    conversations: ConsolidatedConversations[];
  }

  export interface ConsolidatedConversations {
    status: 'hold' | 'open' | 'closed';
    cant: number;
  }

  export interface AgentConversationsResponse {
    success: boolean;
    last_updated_at: string;
    conversations: AgentConversations[];
    sessions: AgentSessions[];
  }

  export interface AgentConversations {
    agent_id: number;
    status: 'hold' | 'open' | 'closed';
    count: number;
  }

  export interface AgentSessions {
    user_id: number;
    last_activity: number;
  }


  export interface StatusContactsResponse {
    success: boolean;
    data: StatusContacts;
  }

  export interface StatusContacts {
    enabled: number;
    blocked: number;
    active: number;
  }

  export interface MessagesResponse {
    success: boolean;
    messages: Messages;
    last_updated: string;
  }

  export interface Messages {
    in: number;
    out: number;
  }

  export interface MessagesBotResponse {
    success: boolean;
    data: MessagesBot;
    last_updated: string;
  }

  export interface MessagesBot {
    from_id: number;
    message_count: number;
  }
  export interface AgentMetricResponse {
    success: boolean;
    data: number;
  }