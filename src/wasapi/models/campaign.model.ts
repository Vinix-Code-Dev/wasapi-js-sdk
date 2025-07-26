export interface Campaign {
    id: number;
    job_id: number;
    name: string;
    phone_id: number;
    schedule_timestamp: number;
    sender_id: number;
    status: 'sent' | 'cancel' | string; 
    updated_at: string;  // ISO string
    user_id: number;
    uuid: string;
    created_at: string;  // ISO string
    description: string | null;
    jobs_count: number;
  }
  