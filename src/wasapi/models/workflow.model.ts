export interface WorkflowStatuses {
    action?: 'open' | 'hold' | 'closed';
    phone?: string;
    agent_id?: number;
    dates?: string; // (Opcional) Rango de fechas en formato YYYY-MM-DD separadas por coma. Ejemplo '2024-03-01,2024-03-31'
    per_page?: number; 
    page?: number; 
}