import axios, { AxiosResponse, AxiosError } from "axios";
import {
  LoginRequest,
  RegisterRequest,
  PasswordResetRequest,
  ConfirmPasswordResetRequest,
  AuthenticationResponse,
  ApiError,
} from "../context/AuthTypes";

// Base URL for the API
const API_BASE_URL = "http://localhost:8080/api/auth";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export class AuthService {
  static async login(
    credentials: LoginRequest
  ): Promise<AuthenticationResponse> {
    try {
      const response: AxiosResponse<AuthenticationResponse> =
        await apiClient.post("/login", credentials);

      // Store tokens and user data in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static async register(
    data: RegisterRequest
  ): Promise<AuthenticationResponse> {
    try {
      const response: AxiosResponse<AuthenticationResponse> =
        await apiClient.post("/register", data);

      // Store tokens and user data in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    try {
      const requestData: PasswordResetRequest = { email };
      await apiClient.post("/forgot-password", requestData);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static async resetPassword(data: ConfirmPasswordResetRequest): Promise<void> {
    try {
      await apiClient.post("/reset-password", data);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static async refreshToken(): Promise<AuthenticationResponse> {
    try {
      const response: AxiosResponse<AuthenticationResponse> =
        await apiClient.post("/refresh-token");

      // Update stored tokens
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.get(`/verify-email?token=${token}`);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static async checkEmail(email: string): Promise<Record<string, unknown>> {
    try {
      const response = await apiClient.get(`/check-email?email=${email}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  static logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  static getStoredUser(): Record<string, unknown> | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  static getStoredToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static isTokenExpired(): boolean {
    const token = localStorage.getItem("accessToken");
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  private static handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as Record<string, unknown>;
      return {
        error: (responseData?.error as string) || "An error occurred",
        message: (responseData?.message as string) || error.message,
        status: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        error: "Network error",
        message:
          "Unable to connect to the server. Please check your internet connection.",
      };
    } else {
      // Other error
      return {
        error: "Unexpected error",
        message: error.message || "An unexpected error occurred",
      };
    }
  }
}
