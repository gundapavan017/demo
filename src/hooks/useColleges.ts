import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { College, PaginatedResponse } from "@/types";
import { useFiltersStore } from "@/store/filters.store";

async function fetchColleges(params: URLSearchParams): Promise<PaginatedResponse<College>> {
  const res = await fetch(`/api/colleges?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch colleges");
  return res.json();
}

async function fetchCollege(id: string): Promise<College> {
  const res = await fetch(`/api/colleges/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("College not found");
    throw new Error("Failed to fetch college");
  }
  return res.json();
}

async function fetchCompareColleges(ids: string[]): Promise<{ colleges: College[] }> {
  const res = await fetch(`/api/colleges/compare?ids=${ids.join(",")}`);
  if (!res.ok) throw new Error("Failed to fetch comparison");
  return res.json();
}

export function useColleges() {
  const getQueryParams = useFiltersStore((s) => s.getQueryParams);
  const filters = useFiltersStore((s) => s.filters);

  return useQuery({
    queryKey: ["colleges", filters],
    queryFn: () => fetchColleges(getQueryParams()),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ["college", id],
    queryFn: () => fetchCollege(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

export function useCompareColleges(ids: string[]) {
  return useQuery({
    queryKey: ["compare", ids],
    queryFn: () => fetchCompareColleges(ids),
    enabled: ids.length >= 2,
    staleTime: 60 * 1000,
  });
}
