
interface Campaign {
  id: number;
  uuid: string;
  user_id: number;
  sender_id: number;
  phone_id: number;
  name: string;
  description: string | null;
  message: string;
  status: 'sent' | 'scheduled' | 'cancel';
  job_id: number;
  contact_selection: string;
  schedule_timestamp: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  messages: MessageStatus[];
  jobs_count: number;
}

interface MessageStatus {
  count: number;
  status: string | null;
}

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

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ResponseCampaignById {
  success: boolean;
  data: {
    campaign: Campaign;
    jobs: JobsPagination;
  };
}
// interface para errores 
export interface ErrorResponseCampaignById {
  success: boolean;
  message: string;
}