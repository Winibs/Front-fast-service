import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api.js";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      isAuthed: () => !!get().token,

      async login(creds) {
        set({ loading: true, error: null });
        try {
          const { token, user } = await api.login(creds);
          localStorage.setItem("fs_token", token);
          set({ token, user, loading: false });
          return true;
        } catch (e) {
          set({ error: e.message, loading: false });
          return false;
        }
      },

      async register(data) {
        set({ loading: true, error: null });
        try {
          const { token, user } = await api.register(data);
          localStorage.setItem("fs_token", token);
          set({ token, user, loading: false });
          return true;
        } catch (e) {
          set({ error: e.message, loading: false });
          return false;
        }
      },

      updateUser(patch) {
        set({ user: { ...get().user, ...patch } });
      },

      logout() {
        localStorage.removeItem("fs_token");
        set({ user: null, token: null, error: null });
      },

      clearError() {
        set({ error: null });
      },
    }),
    {
      name: "fs-auth",
      partialize: (s) => ({ user: s.user, token: s.token }),
    }
  )
);
