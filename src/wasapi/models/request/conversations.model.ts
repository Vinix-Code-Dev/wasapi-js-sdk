export interface GetConversationsParams {
    /** Término de búsqueda — activa el modo búsqueda (max 100 chars) */
    query?: string;
    /** Alcance de la búsqueda: 'contactName' | 'all' */
    search_type?: 'contactName' | 'all';
    /** Filtrar por estado de conversación */
    status?: 'open' | 'hold' | 'closed';
    /** IDs de líneas de WhatsApp separados por coma */
    phones?: string;
    /** IDs de etiquetas separados por coma */
    labels?: string;
    /** IDs de agentes separados por coma */
    agents?: string;
    /** Rango de fechas: 'YYYY-MM-DD,YYYY-MM-DD' */
    dates?: string;
    /** Devuelve conversaciones sin etiquetas */
    without_labels?: boolean;
    /** Filtros adicionales: '0'=todos, '1'=no leídos, '2'=ventana 24h, '3'=ambos */
    open_options?: '0' | '1' | '2' | '3';
    /** Orden de conversaciones: '0'=más reciente, '1'=más antigua */
    order_conversations?: '0' | '1';
    /** Incluir conversaciones de todos los agentes (solo supervisores) */
    all_agents?: boolean;
    /** Cursor de paginación (valor opaco) */
    cursor?: string;
    /** Resultados por página (1-50, default: 20) */
    per_page?: number;
}
