import type { Address, FarmerRequest, Order, Paginated, Product, User } from "@/types";
import type { AuthResponse } from "@/types/api";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const products: Product[] = [
  {
    id: "p1",
    name: "Organic Tomatoes",
    description: "Vine-ripened tomatoes picked this morning from Punjab farms.",
    category: "VEGETABLES",
    price: 180,
    unit: "kg",
    stock: 40,
    images: ["https://images.unsplash.com/photo-1546470427-227c0a0b1c5a?w=800"],
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    name: "Basmati Rice",
    description: "Premium aged basmati, 5kg packs.",
    category: "GRAINS",
    price: 1250,
    unit: "5kg",
    stock: 20,
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800"],
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p3",
    name: "Mango Chaunsa",
    description: "Seasonal Chaunsa mangoes, box of 5kg.",
    category: "FRUITS",
    price: 900,
    unit: "box",
    stock: 12,
    images: ["https://images.unsplash.com/photo-1553279768-865429fa0078?w=800"],
    farmerId: "f2",
    farmerName: "Sindh Orchards",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const users: User[] = [
  {
    id: "u1",
    name: "Ayesha Khan",
    email: "buyer@agro.test",
    role: "BUYER",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u2",
    name: "Hassan Ali",
    email: "farmer@agro.test",
    role: "FARMER",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u3",
    name: "Admin",
    email: "admin@agro.test",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  },
];

const addresses: Address[] = [
  {
    id: "a1",
    label: "Home",
    fullName: "Ayesha Khan",
    phone: "03001234567",
    line1: "12 Garden Street",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
    isDefault: true,
  },
];

const orders: Order[] = [
  {
    id: "o1",
    trackingCode: "AGRO-1001",
    buyerId: "u1",
    farmerId: "f1",
    status: "SHIPPED",
    items: [
      {
        id: "oi1",
        productId: "p1",
        productName: "Organic Tomatoes",
        quantity: 3,
        unitPrice: 180,
        total: 540,
      },
    ],
    subtotal: 540,
    shipping: 80,
    total: 620,
    shippingAddress: addresses[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const requests: FarmerRequest[] = [
  {
    id: "r1",
    userId: "u4",
    userName: "Imran Malik",
    farmName: "Riverbend Farm",
    location: "Multan",
    description: "5 acres of mixed vegetables.",
    documents: [],
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
];

function page<T>(data: T[]): Paginated<T> {
  return { data, total: data.length, page: 1, pageSize: 20 };
}

export async function mockRequest<T>(method: string, url: string, body?: unknown): Promise<T> {
  await delay();
  const path = url.replace(/^\//, "");

  if (path === "auth/login") {
    const { email } = body as { email: string };
    const user = users.find((u) => u.email === email) ?? users[0];
    return { accessToken: "mock-token", user } as T;
  }
  if (path === "auth/register") {
    const payload = body as AuthResponse["user"];
    return {
      accessToken: "mock-token",
      user: { ...payload, id: "new", role: "USER" },
    } as T;
  }
  if (path === "auth/me") return users[0] as T;
  if (path === "auth/change-password") return undefined as T;

  if (path === "products") return page(products) as T;
  if (path.startsWith("products/")) {
    const id = path.split("/")[1];
    return products.find((p) => p.id === id) as T;
  }

  if (path.startsWith("orders/track/")) {
    const code = path.split("/")[2];
    return (orders.find((o) => o.trackingCode === code) ?? orders[0]) as T;
  }
  if (path === "orders" || path === "farmer/orders" || path === "admin/orders") {
    return page(orders) as T;
  }
  if (path.includes("orders/") && method === "GET") return orders[0] as T;
  if (path === "orders/checkout") return orders[0] as T;

  if (path === "addresses") {
    if (method === "POST") {
      const next = { ...(body as Address), id: crypto.randomUUID() };
      addresses.push(next);
      return next as T;
    }
    return addresses as T;
  }

  if (path === "farmer/products" || path.startsWith("farmer/products")) {
    return (method === "GET" ? page(products) : products[0]) as T;
  }

  if (path === "farmer-requests") {
    if (method === "POST") {
      return {
        id: crypto.randomUUID(),
        userId: "me",
        userName: "You",
        status: "PENDING",
        documents: [],
        createdAt: new Date().toISOString(),
        ...(body as object),
      } as T;
    }
    return page(requests) as T;
  }

  if (path === "admin/users") return page(users) as T;
  if (path === "admin/buyers") return page(users.filter((u) => u.role === "BUYER")) as T;

  return page([]) as T;
}

export const MOCK_ENABLED = import.meta.env.VITE_USE_MOCK !== "false";
