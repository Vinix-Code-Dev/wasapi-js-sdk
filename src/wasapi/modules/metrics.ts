import { AxiosClient } from "../client";
import { OnlineAgent, StatusContacts, MetricType, AgentMetricRequest, AgentMetricResponse } from "../models";

export class MetricsModule {
    constructor(private client: AxiosClient) { }

    async getOnlineAgents(): Promise<OnlineAgent[]> {
        const response = await this.client.get('/dashboard/metrics/online-agents');
        console.log(response.data.users);
        return response.data.users;
    }
    async getTotalCampaigns(startDate: string, endDate: string): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/total-campaigns?dates[]=${startDate}&dates[]=${endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getConsolidatedConversations(startDate: string, endDate: string): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/consolidated-conversations?dates[]=${startDate}&dates[]=${endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getAgentConversations(startDate: string, endDate: string): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/agent-conversations?dates[]=${startDate}&dates[]=${endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getStatusContacts(): Promise<StatusContacts> {
        const response = await this.client.get('/dashboard/metrics/contacts');
        console.log(response.data.data);
        return response.data.data as StatusContacts;
    }

    async getMessages(startDate: string, endDate: string): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/messages?dates[]=${startDate}&dates[]=${endDate}`);
        console.log(response.data);
        return response.data;
    }

    async getMessagesBot(startDate: string, endDate: string): Promise<any> {
        const response = await this.client.get(`/dashboard/metrics/messages-bot?dates[]=${startDate}&dates[]=${endDate}`);
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
    async getAgentTimeResponse(agentId: number, startDate: string, endDate: string): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TIME_RESPONSE,
            agent_id: agentId,
            start: startDate,
            end: endDate
        });
    }

    /**
     * Obtiene métricas de solicitudes transferidas de un agente 
     * @param agentId - ID del agente
     * @param startDate - Fecha inicial (YYYY-MM-DD)
     * @param endDate - Fecha final (YYYY-MM-DD)
     * @returns Promise<AgentMetricResponse>
     */
    async getAgentTransferred(agentId: number, startDate: string, endDate: string): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TRANSFERRED,
            agent_id: agentId,
            start: startDate,
            end: endDate
        });
    }

    async getAgentVolumeOfWork(agentId: number, startDate: string, endDate: string): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.VOLUME_OF_WORK,
            agent_id: agentId,
            start: startDate,
            end: endDate
        });
    }


    async getAgentTimeInConversation(agentId: number, startDate: string, endDate: string): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TIME_IN_CONVERSATION,
            agent_id: agentId,
            start: startDate,
            end: endDate
        });
    }

}