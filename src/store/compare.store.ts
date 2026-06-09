import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareStore {
  selectedIds: string[];
  addCollege: (id: string) => void;
  removeCollege: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
  canAdd: () => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedIds: [],

      addCollege: (id) => {
        const { selectedIds } = get();
        if (selectedIds.length >= 3 || selectedIds.includes(id)) return;
        set({ selectedIds: [...selectedIds, id] });
      },

      removeCollege: (id) =>
        set({ selectedIds: get().selectedIds.filter((s) => s !== id) }),

      clearAll: () => set({ selectedIds: [] }),

      isSelected: (id) => get().selectedIds.includes(id),

      canAdd: () => get().selectedIds.length < 3,
    }),
    { name: "compare-store" }
  )
);
