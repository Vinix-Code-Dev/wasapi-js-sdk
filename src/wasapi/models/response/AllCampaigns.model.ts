  interface Campaign {
    id: number;
    job_id: number;
    name: string;
    phone_id: number;
    schedule_timestamp: number;
    sender_id: number;
    status: 'sent' | 'cancel';
    updated_at: string;  // ISO string
    user_id: number;
    uuid: string;
    created_at: string;  // ISO string
    description: string | null;
    jobs_count: number;
  }

  export interface ResponseAllCampaigns {
    success: boolean;
    data: Campaign[];
    count: number;
  }

  export interface ErrorResponseAllCampaigns {
    success: boolean;
    message: string;
  } 