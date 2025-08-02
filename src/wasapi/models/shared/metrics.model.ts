export interface OnlineAgent {
  id: number;
  name: string;
  email: string;
  last_activity: number | null; // timestamp en segundos
  ip_address: string | null;
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
