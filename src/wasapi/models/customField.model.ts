export interface CustomField{
  id: number;
  user_id: number;
  field_name: string;
  type: string | null; 
  created_at: string;
  updated_at: string;
}

export interface CreateCustomField {
  name: string;
}