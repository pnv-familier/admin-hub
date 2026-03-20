import { loginAdmin, type LoginResponse } from "@/services/authService";

const TOKEN_KEY = "admin_token";
const ADMIN_KEY = "admin_user";

export function useAuth() {
  const login = async (email: string, password: string): Promise<LoginResponse> => {
    console.log("[useAuth] Attempting login for:", email);
    const response = await loginAdmin(email, password);
    const { accessToken, user } = response.data;
    console.log("[useAuth] Login successful, storing token:", accessToken ? `${accessToken.substring(0, 20)}...` : "null");
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
    return response;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  };

  const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("[useAuth] Getting token:", token ? `${token.substring(0, 20)}...` : "null");
    return token;
  };

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
