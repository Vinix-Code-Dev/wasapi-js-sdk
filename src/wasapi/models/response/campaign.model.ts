import { DetailedCampaign, MessageStatus, CampaignListItem, CampaignStatus } from "../shared/campaign.model";
import { PaginationLink } from "./paginatedResponse";

// response para obtener todas las campañas
  export interface ResponseAllCampaigns {
    success: boolean;
    data: CampaignListItem[];
    count: number;
  }

export interface CampaignJobContact {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  uuid: string;
  message: MessageStatus;
  errors?: string;
}

export interface CampaignJob {
  id: number;
  campaign_id: number;
  contact_id: number;
  wm_id: number;
  status: string;
  success: number;
  job_id: string;
  logs: string;
  created_at: string;
  updated_at: string;
  contact: CampaignJobContact;
}

export interface CampaignJobsPagination {
  current_page: number;
  data: CampaignJob[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ResponseCreateCampaign {
  success: boolean;
  data: {
    uuid: string;
    name: string;
    description: string | null;
    status: CampaignStatus;
    phone_id: number;
    total_contacts: number;
    scheduled_at: string | null;
    schedule_timestamp: number | null;
    created_at: string;
  };
  recipients: {
    matched: number;
    skipped: string[];
  };
}

export interface ResponseCampaignById {
  success: boolean;
  data: {
    campaign: DetailedCampaign;
    jobs: CampaignJobsPagination;
  };
}
export type CampaignMessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export interface ResponseCampaignStats {
  success: boolean;
  data: Record<CampaignMessageStatus, number>;
}

export interface CampaignLogEntry {
  contact_id: number;
  phone: string;
  status: string;
  message_status: CampaignMessageStatus | null;
  attempt_number: number;
  error: string | null;
}

export interface CampaignLogsPagination {
  has_more: boolean;
  next_cursor: string | null;
  prev_cursor: string | null;
  per_page: number;
}

export interface ResponseCampaignLogs {
  success: boolean;
  data: CampaignLogEntry[];
  pagination: CampaignLogsPagination;
}
