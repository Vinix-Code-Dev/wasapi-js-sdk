// ─── Performance by Agent ─────────────────────────────────────────────────────

export interface AgentPerformance {
    agent_id: number;
    agent_name: string;
    total_conversations: number;
    closed_conversations: number;
    avg_first_response_time: number | null;
    avg_resolution_time: number | null;
    [key: string]: any;
}

export interface PerformanceByAgentResponse {
    success: boolean;
    data: AgentPerformance[];
}

// ─── Volume of Workflow ───────────────────────────────────────────────────────

export interface WorkflowVolumeItem {
    date: string | null;
    day: number | null;
    day_name: string | null;
    hour: number | null;
    from_id: number | null;
    line: string | null;
    total_open_conversations: number;
    total_close_conversations: number;
    total_first_response_count: number;
    current_period_total: number;
    previous_period_total: number;
    percentage_change: number;
    trend: 'stable' | 'up' | 'down' | string;
}

export interface VolumeOfWorkflowResponse {
    success: boolean;
    data: WorkflowVolumeItem[];
}

// ─── Satisfaction Survey ──────────────────────────────────────────────────────

export interface SurveyRatingsDistribution {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
}

export interface SurveyConfig {
    labels: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
    };
    use_default: boolean;
}

export interface SurveySummary {
    total_surveys_sent: number;
    total_responses: number;
    response_rate: number;
    avg_rating: number;
    percentage_change: number;
    trend: string;
}

export interface SatisfactionSurveyData {
    summary: SurveySummary;
    ratings_distribution: SurveyRatingsDistribution;
    satisfaction_trend: any[];
    agent_ratings: any[];
    recent_comments: any[];
    survey_config: SurveyConfig;
}

export interface SatisfactionSurveyResponse {
    success: boolean;
    data: SatisfactionSurveyData;
}
