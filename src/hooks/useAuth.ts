import { loginAdmin, type LoginResponse } from "@/services/authService";

const TOKEN_KEY = "admin_token";
const ADMIN_KEY = "admin_user";

export function useAuth() {
  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const data = await loginAdmin(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  };

  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const getAdmin = () => {
    try {
      const raw = localStorage.getItem(ADMIN_KEY);
      return raw && raw !== "undefined" ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const isAuthenticated = () => !!getToken();

  return { login, logout, getToken, getAdmin, isAuthenticated };
}
