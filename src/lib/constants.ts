export const APP_NAME = "Agro";

export const UserRole = {
  USER: "USER",
  BUYER: "BUYER",
  FARMER: "FARMER",
  ADMIN: "ADMIN",
} as const;

export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole];

export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PACKED: "PACKED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export const RequestStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const ProductCategory = {
  VEGETABLES: "VEGETABLES",
  FRUITS: "FRUITS",
  GRAINS: "GRAINS",
  DAIRY: "DAIRY",
  LIVESTOCK: "LIVESTOCK",
  OTHER: "OTHER",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "agro.accessToken",
  AUTH: "agro.auth",
  CART: "agro.cart",
} as const;

export const QUERY_KEYS = {
  PRODUCTS: ["products"] as const,
  PRODUCT: (id: string) => ["products", id] as const,
  ORDERS: ["orders"] as const,
  ORDER: (id: string) => ["orders", id] as const,
  ADDRESSES: ["addresses"] as const,
  PROFILE: ["profile"] as const,
  REQUESTS: ["farmer-requests"] as const,
  USERS: ["users"] as const,
  BUYERS: ["buyers"] as const,
  DASHBOARD: ["dashboard"] as const,
};
