// Auth utilities
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("admin_token"); // Changed from "token"
  return !!token;
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("admin_user"); // Changed from "user"
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token"); // Changed from "token"
    localStorage.removeItem("admin_user"); // Changed from "user"
  }
  window.location.href = "/admin/login";
};

export const setAuth = (token: string, user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_token", token); // Changed from "token"
    localStorage.setItem("admin_user", JSON.stringify(user)); // Changed from "user"
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token"); // Changed from "token"
};