export interface ReportDateRangeParams {
    /** Fecha de inicio (YYYY-MM-DD) */
    start_date: string;
    /** Fecha de fin (YYYY-MM-DD) */
    end_date: string;
}

export interface PerformanceByAgentParams extends ReportDateRangeParams {
    /** ID del agente (opcional, si se omite trae todos) */
    agent_id?: number;
}

export interface VolumeOfWorkflowParams extends ReportDateRangeParams {
    /** ID de la línea de WhatsApp (opcional) */
    from_id?: number;
}

export interface SatisfactionSurveyParams extends ReportDateRangeParams {
    /** ID del agente (opcional) */
    agent_id?: number;
}
