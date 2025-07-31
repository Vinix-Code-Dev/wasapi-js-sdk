export interface BaseCampaign {
  id: number;
  uuid: string;
  user_id: number;
  sender_id: number;
  phone_id: number;
  name: string;
  description: string | null;
  job_id: number;
  schedule_timestamp: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  jobs_count: number;
}

// Tipos de status unificados
export type CampaignStatus = 'sent' | 'scheduled' | 'cancel';

// Interfaz extendida para respuestas que incluyen más detalles
export interface DetailedCampaign extends BaseCampaign {
  message: string;
  status: CampaignStatus;
  contact_selection: string;
  messages: MessageStatus[];
}

// Interfaz para listados (menos propiedades)
export interface CampaignListItem extends BaseCampaign {
  status: CampaignStatus;
}

export interface MessageStatus {
  count: number;
  status: string | null;
} 