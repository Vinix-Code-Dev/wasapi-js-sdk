import { AxiosClient } from "../client";
import { OnlineAgent, StatusContacts, MetricType, AgentMetricRequest, AgentMetricResponse } from "../models";

export class MetricsModule {
    constructor(private client: AxiosClient) { }

    async getOnlineAgents(): Promise<OnlineAgent[]> {
        const response = await this.client.get('/dashboard/metrics/online-agents');
        console.log(response.data.users);
        return response.data.users;
    }
    async getTotalCampaigns(params: { startDate: string, endDate: string }): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/total-campaigns?dates[]=${params.startDate}&dates[]=${params.endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getConsolidatedConversations(params: { startDate: string, endDate: string }): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/consolidated-conversations?dates[]=${params.startDate}&dates[]=${params.endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getAgentConversations(params: { startDate: string, endDate: string }): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/agent-conversations?dates[]=${params.startDate}&dates[]=${params.endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getStatusContacts(): Promise<StatusContacts> {
        const response = await this.client.get('/dashboard/metrics/contacts');
        console.log(response.data.data);
        return response.data.data as StatusContacts;
    }

    async getMessages(params: { startDate: string, endDate: string }): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/messages?dates[]=${params.startDate}&dates[]=${params.endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getMessagesBot(params: { startDate: string, endDate: string }): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/messages-bot?dates[]=${params.startDate}&dates[]=${params.endDate}`);
        console.log(response.data);
        return response.data;
    }

    /**
     * Obtiene métricas específicas de un agente
     * @param request - Parámetros de la solicitud de métricas
     * @returns Promise<AgentMetricResponse>
     */
    private async  getAgentMetric(request: AgentMetricRequest): Promise<AgentMetricResponse> {
        const params = new URLSearchParams({
            type: request.type,
            agent_id: request.agent_id.toString(),
            start: request.start,
            end: request.end
        });

        const response = await this.client.get(`/metrics?${params.toString()}`);
        console.log(response.data);
        return response.data;
    }

    /**
     * Obtiene métricas de tiempo de respuesta de un agente (método de conveniencia)
     * @param agentId - ID del agente
     * @param startDate - Fecha inicial (YYYY-MM-DD)
     * @param endDate - Fecha final (YYYY-MM-DD)
     * @returns Promise<AgentMetricResponse>
     */
    async getAgentTimeResponse(params: { agentId: number, startDate: string, endDate: string }): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TIME_RESPONSE,
            agent_id: params.agentId,
            start: params.startDate,
            end: params.endDate
        });
    }

    /**
     * Obtiene métricas de solicitudes transferidas de un agente 
     * @param agentId - ID del agente
     * @param startDate - Fecha inicial (YYYY-MM-DD)
     * @param endDate - Fecha final (YYYY-MM-DD)
     * @returns Promise<AgentMetricResponse>
     */
    async getAgentTransferred(params: { agentId: number, startDate: string, endDate: string }): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TRANSFERRED,
            agent_id: params.agentId,
            start: params.startDate,
            end: params.endDate
        });
    }

    async getAgentVolumeOfWork(params: { agentId: number, startDate: string, endDate: string }): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.VOLUME_OF_WORK,
            agent_id: params.agentId,
            start: params.startDate,
            end: params.endDate
        });
    }


    async getAgentTimeInConversation(params: { agentId: number, startDate: string, endDate: string }): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TIME_IN_CONVERSATION,
            agent_id: params.agentId,
            start: params.startDate,
            end: params.endDate
        });
    }

}