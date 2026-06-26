import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePrefsStore = create(
  persist(
    (set) => ({
      privacy: {
        shareLocation: true,
        visibleProfile: true,
        readReceipts: false,
        anonymousData: true,
      },
      notifications: {
        orderStatus: true,
        newMessages: true,
        promos: false,
        weeklyDigest: true,
        receipts: true,
        sound: true,
      },
      toggle(group, key) {
        set((s) => ({ [group]: { ...s[group], [key]: !s[group][key] } }));
      },
    }),
    { name: "fs-prefs" }
  )
);
