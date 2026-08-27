import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants";
import type {
  Address,
  FarmerRequest,
  Order,
  Paginated,
  Product,
  User,
} from "@/types";
import type {
  AddressPayload,
  CheckoutPayload,
  FarmerRequestPayload,
  ProductPayload,
} from "@/types/api";

export function useProducts(params?: Record<string, string | number | undefined>) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, params],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Product>>("/products", { params });
      return data;
    },
  });
}

export function useProduct(id?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT(id ?? ""),
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: Boolean(id),
  });
}

export function useOrders(scope: "mine" | "farmer" | "admin" = "mine") {
  const path =
    scope === "admin"
      ? "/admin/orders"
      : scope === "farmer"
        ? "/farmer/orders"
        : "/orders";
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDERS, scope],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Order>>(path);
      return data;
    },
  });
}

export function useOrder(id?: string, scope: "mine" | "farmer" | "admin" = "mine") {
  const path =
    scope === "admin"
      ? `/admin/orders/${id}`
      : scope === "farmer"
        ? `/farmer/orders/${id}`
        : `/orders/${id}`;
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDER(id ?? ""), scope],
    queryFn: async () => {
      const { data } = await api.get<Order>(path);
      return data;
    },
    enabled: Boolean(id),
  });
}

export function useTrackOrder(code: string) {
  return useQuery({
    queryKey: ["track-order", code],
    queryFn: async () => {
      const { data } = await api.get<Order>(`/orders/track/${code}`);
      return data;
    },
    enabled: code.length > 3,
  });
}

export function useAddresses() {
  return useQuery({
    queryKey: QUERY_KEYS.ADDRESSES,
    queryFn: async () => {
      const { data } = await api.get<Address[]>("/addresses");
      return data;
    },
  });
}

export function useSaveAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AddressPayload & { id?: string }) => {
      if (payload.id) {
        const { data } = await api.put<Address>(`/addresses/${payload.id}`, payload);
        return data;
      }
      const { data } = await api.post<Address>("/addresses", payload);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES });
      toast.success("Address saved");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const { data } = await api.post<Order>("/orders/checkout", payload);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      toast.success("Order placed");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useSaveProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ProductPayload & { id?: string }) => {
      if (payload.id) {
        const { data } = await api.put<Product>(`/farmer/products/${payload.id}`, payload);
        return data;
      }
      const { data } = await api.post<Product>("/farmer/products", payload);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      toast.success("Product saved");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useFarmerRequests() {
  return useQuery({
    queryKey: QUERY_KEYS.REQUESTS,
    queryFn: async () => {
      const { data } = await api.get<Paginated<FarmerRequest>>("/farmer-requests");
      return data;
    },
  });
}

export function useCreateFarmerRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FarmerRequestPayload) => {
      const { data } = await api.post<FarmerRequest>("/farmer-requests", payload);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REQUESTS });
      toast.success("Request submitted");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async () => {
      const { data } = await api.get<Paginated<User>>("/admin/users");
      return data;
    },
  });
}

export function useBuyers() {
  return useQuery({
    queryKey: QUERY_KEYS.BUYERS,
    queryFn: async () => {
      const { data } = await api.get<Paginated<User>>("/admin/buyers");
      return data;
    },
  });
}
