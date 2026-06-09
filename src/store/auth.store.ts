import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...updates } });
      },
    }),
    { name: "auth-store" }
  )
);
