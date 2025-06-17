import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  UserInfo,
  LoginRequest,
  RegisterRequest,
  ConfirmPasswordResetRequest,
  ApiError,
} from "./AuthTypes";
import { AuthService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = AuthService.getStoredUser();
        const token = AuthService.getStoredToken();

        if (storedUser && token && !AuthService.isTokenExpired()) {
          setUser(storedUser as unknown as UserInfo);
          setIsAuthenticated(true);
        } else if (token && AuthService.isTokenExpired()) {
          // Try to refresh token
          try {
            const response = await AuthService.refreshToken();
            setUser(response.user);
            setIsAuthenticated(true);
          } catch {
            // Refresh failed, clear auth state
            AuthService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || apiError.error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.register(data);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || apiError.error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await AuthService.forgotPassword(email);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || apiError.error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    data: ConfirmPasswordResetRequest
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await AuthService.resetPassword(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || apiError.error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const response = await AuthService.refreshToken();
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      // If refresh fails, logout user
      logout();
      throw error;
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    refreshToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
