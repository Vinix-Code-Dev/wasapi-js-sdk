export interface Stage {
    id: number;
    uuid: string;
    funnel_id: number;
    org_id?: number;
    whatsapp_number_id?: number;
    description?: string;
    mark_as_main?: boolean;
    name: string;
    order: number;
    created_at: string;
    updated_at: string;
  }     