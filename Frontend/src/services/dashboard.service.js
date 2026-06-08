import { http } from "./http";

export const dashboardService = {
  getUserDashboard: async () => (await http.get("/user/dashboard")).data.data,
  getAgentDashboard: async () => (await http.get("/agent/dashboard")).data.data,
  getAdminDashboard: async () => (await http.get("/admin/dashboard")).data.data,
  getUsers: async () => (await http.get("/admin/users")).data.data,
  getAgents: async () => (await http.get("/admin/agents")).data.data,
  getKycRequests: async () => (await http.get("/admin/kyc-requests")).data.data,
};

