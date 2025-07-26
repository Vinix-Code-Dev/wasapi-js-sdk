export interface Label {
  id: number;
  title: string;
  description: string | null;
  color: string;
  updated_at: string; 
}

export interface CreateLabel {
  title: string;
  description?: string | null;
  color: string;
}