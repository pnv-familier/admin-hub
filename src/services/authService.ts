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

export async function registerAdmin(
  fullName: string,
  email: string,
  password: string,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Failed to create admin");
  }
}
