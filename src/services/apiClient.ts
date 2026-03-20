const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE) {
    this.baseURL = baseURL;
  }

  private getStoredToken(): string | null {
    const token = localStorage.getItem("admin_token");
    console.log("[ApiClient] Stored token:", token ? `${token.substring(0, 20)}...` : "null");
    return token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useAuth: boolean = true
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers as Record<string, string>,
    };

    // Auto-add auth token if useAuth is true
    if (useAuth) {
      const token = this.getStoredToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log("[ApiClient] Added auth header for:", endpoint);
      } else {
        console.warn("[ApiClient] No token found for authenticated request:", endpoint);
      }
    }
    
    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, useAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" }, useAuth);
  }

  async post<T>(endpoint: string, data?: unknown, useAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }, useAuth);
  }

  async put<T>(endpoint: string, data?: unknown, useAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }, useAuth);
  }

  async delete<T>(endpoint: string, useAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" }, useAuth);
  }
}

export const apiClient = new ApiClient();