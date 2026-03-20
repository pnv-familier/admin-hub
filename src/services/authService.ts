import { apiClient } from "./apiClient";

export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      avatarUrl: string | null;
      authProvider: string;
      createdAt: string;
      updatedAt: string;
      premium: boolean;
      setup: boolean;
    };
  };
}

export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/api/v1/admin/login", { email, password }, false);
}
