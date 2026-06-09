import { create } from "zustand";
import { CollegeFilters } from "@/types";

const DEFAULT_FILTERS: CollegeFilters = {
  search: "",
  location: "",
  type: "",
  feesMin: 0,
  feesMax: 10000000,
  ratingMin: 0,
  sortBy: "rating",
  page: 1,
  limit: 9,
};

interface FiltersStore {
  filters: CollegeFilters;
  setSearch: (search: string) => void;
  setFilter: <K extends keyof CollegeFilters>(key: K, value: CollegeFilters[K]) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  getQueryParams: () => URLSearchParams;
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  filters: DEFAULT_FILTERS,

  setSearch: (search) =>
    set((s) => ({ filters: { ...s.filters, search, page: 1 } })),

  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value, page: 1 } })),

  setPage: (page) => set((s) => ({ filters: { ...s.filters, page } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  getQueryParams: () => {
    const f = get().filters;
    const params = new URLSearchParams();
    if (f.search) params.set("search", f.search);
    if (f.location) params.set("location", f.location);
    if (f.type) params.set("type", f.type);
    if (f.feesMin > 0) params.set("feesMin", String(f.feesMin));
    if (f.feesMax < 10000000) params.set("feesMax", String(f.feesMax));
    if (f.ratingMin > 0) params.set("ratingMin", String(f.ratingMin));
    params.set("sortBy", f.sortBy);
    params.set("page", String(f.page));
    params.set("limit", String(f.limit));
    return params;
  },
}));
