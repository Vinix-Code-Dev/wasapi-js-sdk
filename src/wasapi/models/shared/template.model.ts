import { WhatsAppNumber } from "./whatsappnumber.model";

export interface Template extends TemplateBase {

  }

interface App {
    id: number;
    uuid: string;
    user_id: number;
    name: string;
    app_id: string;
    waba_id: string;
    default: number;
    created_at: string;
    updated_at: string;
    business_id: string | null;
    numbers: WhatsAppNumber[];
  }


  export interface TemplateBase {
    id: number;
    user_id: number;
    global: number;
    uuid: string;
    language: string;
    template_id: string;
    body: string;
    status: 'APPROVED' | 'PENDING' | 'REJECTED';
    created_at: string;
    updated_at: string;
    app_id: number;
    app: App;
  }

  export interface TemplateFull extends TemplateBase {
    header_type: string;
    header_value: string | null;
    footer: string | null;
    buttons_type: string;
    buttons_value: ButtonValue[];
  }

interface ButtonValue {
    action: string;
    text: string;
    flow_id: number;
    flow_action: string;
    navigate_screen: string;
  }
  