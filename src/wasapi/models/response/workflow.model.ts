import { PaginatedResponse } from "./paginatedResponse";

export type WorkflowResponse = PaginatedResponse<Workflow>;

export interface Workflow {
    id: number;
    name: string;
    description: string;
    color: string;
    order: number;
    created_at: string;
    updated_at: string;
}

