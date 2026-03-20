import { apiClient } from "./apiClient";

export interface CoreOverview {
  totalUsers: number;
  userGrowth: number;
  totalFamilyGroups: number;
  groupGrowth: number;
}

export interface AIOverview {
  totalInteractions: number;
  interactionGrowth: number;
  totalFeedbacks: number;
  feedbackTrend: number;
}

export interface DashboardData {
  core: CoreOverview;
  ai: AIOverview;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const [core, ai] = await Promise.all([
    apiClient.get<CoreOverview>("/api/v1/admin/core-overview"),
    apiClient.get<AIOverview>("/ai/api/v1/admin/ai-overview"),
  ]);

  return { core, ai };
}