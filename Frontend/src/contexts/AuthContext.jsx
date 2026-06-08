import { useEffect, useState } from "react";
import { AuthContext } from "./authContextInstance";
import { authService, normalizeUser } from "../services/auth.service";
import { TOKEN_KEY } from "../services/http";

const getStoredUser = () => {
  const raw = localStorage.getItem("agile_insurance_user");
  if (!raw) return null;
  try {
    return normalizeUser(JSON.parse(raw));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authService.me();
        setUser(currentUser);
        localStorage.setItem("agile_insurance_user", JSON.stringify(currentUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("agile_insurance_user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const syncUser = (nextUser) => {
    const normalized = normalizeUser(nextUser);
    setUser(normalized);
    if (normalized) {
      localStorage.setItem("agile_insurance_user", JSON.stringify(normalized));
    } else {
      localStorage.removeItem("agile_insurance_user");
    }
    return normalized;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    return syncUser(response.user);
  };

  const login = async (payload) => {
    const response = await authService.login(payload);
    return syncUser(response.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("agile_insurance_user");
      setUser(null);
    }
  };

  const updateProfile = async (payload) => {
    const response = await authService.updateProfile(payload);
    return syncUser(response);
  };

  const changePassword = (payload) => authService.changePassword(payload);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        refreshUser: async () => {
          const currentUser = await authService.me();
          return syncUser(currentUser);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
