import { ReactNode } from "react";

// API Response Types
export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  lastLogin?: string;
  createdAt: string;
  profileId?: number;
  profileName?: string;
  profileVerified: boolean;
  emailVerified: boolean;
  accountLocked: boolean;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshExpiresIn: number;
  user: UserInfo;
}

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  role: UserRole;
  // Business fields (for BUSINESS_OWNER)
  businessName?: string;
  businessDescription?: string;
  businessEmail?: string;
  businessPhone?: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  businessAddress?: string;
  businessCity?: string;
  businessState?: string;
  businessPostalCode?: string;
  businessCountry?: string;
  websiteUrl?: string;
  // Shop fields (for SELLER)
  shopName?: string;
  shopDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  bankAccountInfo?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ConfirmPasswordResetRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Enums
export enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  BUSINESS_OWNER = "BUSINESS_OWNER",
  ADMIN = "ADMIN",
}

// Context Types
export interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ConfirmPasswordResetRequest) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

// API Error Response
export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}
