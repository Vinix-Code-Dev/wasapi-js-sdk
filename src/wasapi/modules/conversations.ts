import { AxiosClient } from "../client";
import { GetConversationsParams } from "../models/request/conversations.model";
import { ResponseConversations } from "../models/response/conversations.model";

export class ConversationsModule {
    constructor(private client: AxiosClient) { }

    /**
     * GET https://api-ws.wasapi.io/api/v1/conversations
     * Lista, busca y filtra conversaciones con paginación basada en cursor.
     *
     * Modo búsqueda — se activa cuando se pasa el parámetro `query`.
     * Modo filtro   — el resto de parámetros para filtrar sin búsqueda.
     */
    
    async getAll(params: GetConversationsParams = {}): Promise<ResponseConversations> {
        const qs = new URLSearchParams();

        if (params.query)               qs.append('query', params.query);
        if (params.search_type)         qs.append('search_type', params.search_type);
        if (params.status)              qs.append('status', params.status);
        if (params.phones)              qs.append('phones', params.phones);
        if (params.labels)              qs.append('labels', params.labels);
        if (params.agents)              qs.append('agents', params.agents);
        if (params.dates)               qs.append('dates', params.dates);
        if (params.without_labels !== undefined) qs.append('without_labels', String(params.without_labels));
        if (params.open_options)        qs.append('open_options', params.open_options);
        if (params.order_conversations) qs.append('order_conversations', params.order_conversations);
        if (params.all_agents !== undefined) qs.append('all_agents', String(params.all_agents));
        if (params.cursor)              qs.append('cursor', params.cursor);
        if (params.per_page !== undefined) qs.append('per_page', String(params.per_page));

        const query = qs.toString();
        const response = await this.client.get(`/conversations${query ? `?${query}` : ''}`);
        return response.data as ResponseConversations;
    }

    /**
     * Navega a la siguiente página usando el cursor devuelto por la llamada anterior.
     */
    async getNextPage(cursor: string, params: Omit<GetConversationsParams, 'cursor'> = {}): Promise<ResponseConversations> {
        return this.getAll({ ...params, cursor });
    }
}
