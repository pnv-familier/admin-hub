const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export interface LoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/v1/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Invalid email or password");
  }

  return res.json();
}
