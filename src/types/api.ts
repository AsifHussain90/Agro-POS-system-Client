export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "USER" | "BUYER";
}

export interface AdminRegisterPayload {
  name: string;
  email: string;
  password: string;
  secretKey: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "BUYER" | "FARMER" | "ADMIN";
    avatarUrl?: string;
  };
}

export interface CheckoutPayload {
  addressId: string;
  items: Array<{ productId: string; quantity: number }>;
}

export interface ProductPayload {
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  isActive: boolean;
}

export interface AddressPayload {
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface FarmerRequestPayload {
  farmName: string;
  location: string;
  description: string;
  documents?: string[];
}
