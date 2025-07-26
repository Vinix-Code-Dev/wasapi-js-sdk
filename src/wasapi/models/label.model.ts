export interface Label {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    color: string;
    created_at: string;
    updated_at: string;
    pivot: {
      contact_id: number;
      label_id: number;
    };
  }