import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedStore {
  savedCollegeIds: string[];
  saveCollege: (id: string) => void;
  unsaveCollege: (id: string) => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedCollegeIds: [],

      saveCollege: (id) => {
        if (get().savedCollegeIds.includes(id)) return;
        set({ savedCollegeIds: [...get().savedCollegeIds, id] });
      },

      unsaveCollege: (id) =>
        set({ savedCollegeIds: get().savedCollegeIds.filter((s) => s !== id) }),

      toggleSaved: (id) => {
        if (get().isSaved(id)) get().unsaveCollege(id);
        else get().saveCollege(id);
      },

      isSaved: (id) => get().savedCollegeIds.includes(id),
    }),
    { name: "saved-store" }
  )
);
