import { DetailedCampaign, MessageStatus, CampaignListItem } from "../shared/campaign.model";
import { PaginationLink } from "./paginatedResponse";

// response para obtener todas las campañas
  export interface ResponseAllCampaigns {
    success: boolean;
    data: CampaignListItem[];
    count: number;
  }

// response para obtener una campaña por su id
interface JobsPagination {
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
interface CampaignJob {
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
  contact: Contact;
}

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  uuid: string;
  message: MessageStatus;
  errors?: string;
}

export interface ResponseCampaignById {
  success: boolean;
  data: {
    campaign: DetailedCampaign;
    jobs: JobsPagination;
  };
}
