import { AxiosClient } from "../client";
import { WorkflowResponse } from "../models/response/workflow.model";
import { WorkflowStatuses } from "../models/shared/workflow.model";

export class WorkflowModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/workflow-statuses?action={action}&phone={phone}&agent_id={agent_id}&dates={dates}&per_page={per_page}&page={page}    obtener los estados de los flujos de trabajo
    async getStatuses({ action, phone, agent_id, dates, per_page, page }: WorkflowStatuses): Promise<WorkflowResponse> {
        const qs = new URLSearchParams();
        if (action !== undefined)    qs.append('action', action);
        if (phone !== undefined)     qs.append('phone', phone);
        if (agent_id !== undefined)  qs.append('agent_id', String(agent_id));
        if (dates !== undefined)     qs.append('dates', dates);
        if (per_page !== undefined)  qs.append('per_page', String(per_page));
        if (page !== undefined)      qs.append('page', String(page));
        const query = qs.toString();
        const response = await this.client.get(`/workflow-statuses${query ? `?${query}` : ''}`);
        return response.data as WorkflowResponse;
    }
}