import { create } from "zustand";
import { api } from "../lib/api.js";
import { useAuthStore } from "./authStore.js";

export const useMapStore = create((set, get) => ({
  points: [],
  loading: false,
  loaded: false,
  error: null,
  selectedId: null,

  async load() {
    const email = useAuthStore.getState().user?.email;
    set({ loading: true, error: null });
    try {
      const points = await api.listPoints(email);
      set({ points, loading: false, loaded: true });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  async addPoint(point) {
    const email = useAuthStore.getState().user?.email;
    try {
      const created = await api.createPoint(email, point);
      set({ points: [...get().points, created], selectedId: created.id });
      return created;
    } catch (e) {
      set({ error: e.message });
      throw e;
    }
  },

  async removePoint(id) {
    const email = useAuthStore.getState().user?.email;
    try {
      await api.deletePoint(email, id);
      set({ points: get().points.filter((p) => p.id !== id), selectedId: null });
    } catch (e) {
      set({ error: e.message });
    }
  },

  select(id) {
    set({ selectedId: id });
  },
}));
