import { AxiosClient } from "../client";
import {
    PerformanceByAgentParams,
    VolumeOfWorkflowParams,
    SatisfactionSurveyParams
} from "../models/request/reports.model";
import {
    PerformanceByAgentResponse,
    VolumeOfWorkflowResponse,
    SatisfactionSurveyResponse
} from "../models/response/reports.model";

export class ReportsModule {
    constructor(private client: AxiosClient) { }

    /**
     * GET https://api-ws.wasapi.io/api/v1/reports/performance-by-agent
     * Consultar rendimiento por agente en un rango de fechas.
     */
    async getPerformanceByAgent({ start_date, end_date, agent_id }: PerformanceByAgentParams): Promise<PerformanceByAgentResponse> {
        const qs = new URLSearchParams({ start_date, end_date });
        if (agent_id !== undefined) qs.append('agent_id', String(agent_id));
        const response = await this.client.get(`/reports/performance-by-agent?${qs.toString()}`);
        return response.data as PerformanceByAgentResponse;
    }

    /**
     * GET https://api-ws.wasapi.io/api/v1/reports/volume-of-workflow
     * Consultar volumen de trabajo por hora en un rango de fechas.
     */
    async getVolumeOfWorkflow({ start_date, end_date, from_id }: VolumeOfWorkflowParams): Promise<VolumeOfWorkflowResponse> {
        const qs = new URLSearchParams({ start_date, end_date });
        if (from_id !== undefined) qs.append('from_id', String(from_id));
        const response = await this.client.get(`/reports/volume-of-workflow?${qs.toString()}`);
        return response.data as VolumeOfWorkflowResponse;
    }

    /**
     * GET https://api-ws.wasapi.io/api/v1/reports/satisfaction-survey-report
     * Consultar reporte de encuestas de satisfacción.
     */
    async getSatisfactionSurvey({ start_date, end_date, agent_id }: SatisfactionSurveyParams): Promise<SatisfactionSurveyResponse> {
        const qs = new URLSearchParams({ start_date, end_date });
        if (agent_id !== undefined) qs.append('agent_id', String(agent_id));
        const response = await this.client.get(`/reports/satisfaction-survey-report?${qs.toString()}`);
        return response.data as SatisfactionSurveyResponse;
    }
}
