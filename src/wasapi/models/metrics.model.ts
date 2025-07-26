export interface OnlineAgent {
  id: number;
  name: string;
  email: string;
  last_activity: number | null; // timestamp en segundos
  ip_address: string | null;
}

export interface OnlineAgentsResponse {
  success: boolean;
  users: OnlineAgent[];
  updated_at: string; // ISO date string
}

export interface StatusContacts {
  enabled: number;
  active: number;
}

export enum MetricType {
  TRANSFERRED = 'transferred',
  TIME_RESPONSE = 'time_response',
  VOLUME_OF_WORK = 'volume_of_work',
  TIME_IN_CONVERSATION = 'time_in_conversation'
}

export interface AgentMetricRequest {
  type: MetricType;
  agent_id: number;
  start: string;
  end: string;
}

export interface AgentMetricResponse {
  success: boolean;
  data: any; 
  created_at: string;
} 