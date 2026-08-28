import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/stores/authStore";
import type { User } from "@/types";
import type {
  AuthResponse,
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
} from "@/types/api";

export function useCurrentUser() {
  return useAuthStore((s) => s.user);
}

export function useIsAuthenticated() {
  return useAuthStore((s) => Boolean(s.user && s.accessToken));
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<AuthResponse>("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user as User, data.accessToken);
      toast.success("Welcome back");
      const home =
        data.user.role === "ADMIN"
          ? "/admin"
          : data.user.role === "FARMER"
            ? "/farmer"
            : data.user.role === "BUYER"
              ? "/buyer/orders"
              : "/requests";
      void navigate(home);
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<AuthResponse>("/auth/register", payload);
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user as User, data.accessToken);
      toast.success("Account created");
      void navigate(data.user.role === "BUYER" ? "/products" : "/requests");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      await api.post("/auth/change-password", payload);
    },
    onSuccess: () => toast.success("Password updated"),
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    toast.success("Signed out");
    void navigate("/login");
  };
}

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILE,
    queryFn: async () => {
      const { data } = await api.get<User>("/auth/me");
      return data;
    },
    enabled: useAuthStore.getState().isAuthenticated(),
  });
}

export function useAuth() {
  const user = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();
  return { user, isAuthenticated, logout };
}


