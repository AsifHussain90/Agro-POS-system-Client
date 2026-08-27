export type UserRole = "USER" | "BUYER" | "FARMER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ProductCategory =
  | "VEGETABLES"
  | "FRUITS"
  | "GRAINS"
  | "DAIRY"
  | "LIVESTOCK"
  | "OTHER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Address {
  id: string;
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

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  farmerId: string;
  farmerName: string;
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  unit: string;
  image?: string;
  quantity: number;
  stock: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  trackingCode: string;
  buyerId: string;
  farmerId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface FarmerRequest {
  id: string;
  userId: string;
  userName: string;
  farmName: string;
  location: string;
  description: string;
  documents: string[];
  status: RequestStatus;
  createdAt: string;
}

export interface DashboardStats {
  title: string;
  value: string | number;
  hint?: string;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
