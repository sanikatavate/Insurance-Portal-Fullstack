import { http, TOKEN_KEY } from "./http";

export const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    fullName: user.full_name || user.fullName || "",
    displayRole: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "",
    membership: user.role === "admin" ? "Administrator" : user.role === "agent" ? "Agent" : "User",
  };
};

const extractAuth = (payload) => {
  const authData = payload?.data?.data || payload?.data || {};
  const token = authData.token;
  const user = normalizeUser(authData.user);
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  return { token, user };
};

export const authService = {
  async register(payload) {
    const response = await http.post("/auth/register", payload);
    return extractAuth(response);
  },
  async login(payload) {
    const response = await http.post("/auth/login", payload);
    return extractAuth(response);
  },
  async logout() {
    await http.post("/auth/logout");
    localStorage.removeItem(TOKEN_KEY);
    return true;
  },
  async me() {
    const response = await http.get("/auth/me");
    const user = normalizeUser(response.data.data);
    return user;
  },
  async updateProfile(payload) {
    const response = await http.put("/auth/update-profile", payload);
    return normalizeUser(response.data.data);
  },
  async changePassword(payload) {
    const response = await http.put("/auth/change-password", payload);
    return response.data;
  },
};

