import { AxiosClient } from "../client";
import { AgentConversationsResponse, AgentMetricResponse, ConsolidatedConversationsResponse, MessagesBotResponse, MessagesResponse, OnlineAgentsResponse, StatusContactsResponse, TotalCampaignsResponse } from "../models/response/metrics.model";
import { AgentMetricRequest, MetricType } from "../models/shared/metrics.model";

export class MetricsModule {
    constructor(private client: AxiosClient) { }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/online-agents obtener los agentes en línea 
    async getOnlineAgents(): Promise<OnlineAgentsResponse> {
        try {
            const response = await this.client.get('/dashboard/metrics/online-agents');
            return response.data as OnlineAgentsResponse;
        } catch (error) {
            throw error;
        }
    }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/total-campaigns obtener las campañas totales
    async getTotalCampaigns(params: { startDate: string, endDate: string }): Promise<TotalCampaignsResponse> {
        try {
            const response = await this.client.get(`/dashboard/metrics/total-campaigns?dates[]=${params.startDate}&dates[]=${params.endDate}`);
            return response.data as TotalCampaignsResponse;
        } catch (error) {
            throw error;
        }
    }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/consolidated-conversations obtener las conversaciones consolidadas
    async getConsolidatedConversations(params: { startDate: string, endDate: string }): Promise<ConsolidatedConversationsResponse> {
        try {
            const response = await this.client.get(`/dashboard/metrics/consolidated-conversations?dates[]=${params.startDate}&dates[]=${params.endDate}`);
            return response.data as ConsolidatedConversationsResponse;
        } catch (error) {
            throw error;
        }
    }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/agent-conversations obtener las conversaciones del agente
    async getAgentConversations(params: { startDate: string, endDate: string }): Promise<AgentConversationsResponse> {
        try {
            const response = await this.client.get(`/dashboard/metrics/agent-conversations?dates[]=${params.startDate}&dates[]=${params.endDate}`);
            return response.data as AgentConversationsResponse;
        } catch (error) {
            throw error;
        }
    }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/contacts obtener el estado de los contactos
    async getStatusContacts(): Promise<StatusContactsResponse> {
        try {
            const response = await this.client.get('/dashboard/metrics/contacts');
            return response.data as StatusContactsResponse;
        } catch (error) {
            throw error;
        }
    }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/messages obtener las conversaciones
    async getMessages(params: { startDate: string, endDate: string }): Promise<MessagesResponse> {
        try {
            const response = await this.client.get(`/dashboard/metrics/messages?dates[]=${params.startDate}&dates[]=${params.endDate}`);
            return response.data as MessagesResponse;
        } catch (error) {
            throw error;
        }
    }

    //GET https://api-ws.wasapi.io/api/v1/dashboard/metrics/messages-bot obtener las conversaciones del bot
    async getMessagesBot(params: { startDate: string, endDate: string }): Promise<MessagesBotResponse> {
        try {
            const response = await this.client.get(`/dashboard/metrics/messages-bot?dates[]=${params.startDate}&dates[]=${params.endDate}`);
            return response.data as MessagesBotResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET https://api-ws.wasapi.io/api/v1/metrics
     * Obtiene métricas específicas de un agente
     * @param request - Parámetros de la solicitud de métricas
     * @returns Promise<AgentMetricResponse>
     */
    private async  getAgentMetric(request: AgentMetricRequest): Promise<AgentMetricResponse> {
        try {
        const params = new URLSearchParams({
            type: request.type,
            agent_id: request.agent_id.toString(),
            start: request.start,
            end: request.end
        });

        const response = await this.client.get(`/metrics?${params.toString()}`);
            return response.data as AgentMetricResponse;
        } catch (error) {
            throw error;
        }
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

    //GET https://api-ws.wasapi.io/api/v1/metrics obtener el volumen de trabajo de un agente
    async getAgentVolumeOfWork(params: { agentId: number, startDate: string, endDate: string }): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.VOLUME_OF_WORK,
            agent_id: params.agentId,
            start: params.startDate,
            end: params.endDate
        });
    }

    //GET https://api-ws.wasapi.io/api/v1/metrics obtener el tiempo en conversación de un agente
    async getAgentTimeInConversation(params: { agentId: number, startDate: string, endDate: string }): Promise<AgentMetricResponse> {
        return this.getAgentMetric({
            type: MetricType.TIME_IN_CONVERSATION,
            agent_id: params.agentId,
            start: params.startDate,
            end: params.endDate
        });
    }

}