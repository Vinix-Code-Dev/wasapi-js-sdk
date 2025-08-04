export interface Flows {
    data: Flow[];
    paging?: Paging;
  }
  
  export interface Flow {
    name: string;
    status: 'PUBLISHED' | 'DRAFT' | 'DEPRECATED';
    categories: FlowCategory[];
    validation_errors: any[];
    id: string;
  }
  
  export type FlowCategory =
    | 'OTHER'
    | 'SURVEY'
    | 'CUSTOMER_SUPPORT'
    | 'APPOINTMENT_BOOKING'
    | 'LEAD_GENERATION'
    | 'SIGN_UP';
  
  export interface Paging {
    cursors: {
      before: string;
      after: string;
    };
  }

  export interface FlowDetail extends Flow {
    preview: FlowPreview;
    json_version: string;
    whatsapp_business_account: WhatsAppBusinessAccount;
  }

  export interface FlowPreview {
    preview_url: string;
    expires_at: string; // ISO date
  }

  export interface WhatsAppBusinessAccount {
    id: string;
    name: string;
    currency: string;
    timezone_id: string;
    message_template_namespace: string;
  }

  export interface Screen {
    label: string;
    value: string;
  }