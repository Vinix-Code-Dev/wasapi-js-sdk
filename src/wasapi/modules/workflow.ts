import { AxiosClient } from "../client";
import { WorkflowResponse } from "../models/response/workflow.model";
import { WorkflowStatuses } from "../models/shared/workflow.model";

export class WorkflowModule {
    constructor(private client: AxiosClient) { }

    // GET https://api-ws.wasapi.io/api/v1/workflow-statuses?action={action}&phone={phone}&agent_id={agent_id}&dates={dates}&per_page={per_page}&page={page}    obtener los estados de los flujos de trabajo
    async getStatuses({ action, phone, agent_id, dates, per_page, page }: WorkflowStatuses): Promise<WorkflowResponse> {
        const response = await this.client.get(`/workflow-statuses?action=${action}&phone=${phone}&agent_id=${agent_id}&dates=${dates}&per_page=${per_page}&page=${page}`);
        console.log(response.data);
        return response.data as WorkflowResponse;
    }
}