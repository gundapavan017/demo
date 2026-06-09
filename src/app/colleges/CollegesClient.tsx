"use client";
import { useColleges } from "@/hooks/useColleges";
import { useFiltersStore } from "@/store/filters.store";
import { CollegeCard } from "@/components/college/CollegeCard";
import { CollegeCardSkeleton } from "@/components/college/CollegeCardSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterPanel } from "@/components/search/FilterPanel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CollegesClient() {
  const { data, isLoading, isError, refetch, isFetching } = useColleges();
  const { filters, setPage } = useFiltersStore();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Explore Colleges</h1>
        <p className="text-gray-500 text-sm mt-1">
          {data ? `${data.total} colleges found` : "Searching..."}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-3">
        <SearchBar className="flex-1" />
        <Button
          variant="outline"
          className="md:hidden gap-2"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters — desktop */}
        <aside className="hidden md:block w-64 shrink-0">
          <FilterPanel />
        </aside>

        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <FilterPanel />
              <Button className="w-full mt-4" onClick={() => setMobileFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          {isError ? (
            <ErrorState onRetry={refetch} />
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className={cn(
                "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
                isFetching && "opacity-60 pointer-events-none transition-opacity"
              )}>
                {data?.data.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(filters.page - 1)}
                    disabled={filters.page <= 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: data.totalPages }).map((_, i) => {
                      const page = i + 1;
                      const isCurrent = page === filters.page;
                      if (
                        page === 1 || page === data.totalPages ||
                        Math.abs(page - filters.page) <= 1
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setPage(page)}
                            className={cn(
                              "h-8 w-8 rounded-lg text-sm font-medium transition-colors",
                              isCurrent
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            )}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (
                        (page === 2 && filters.page > 3) ||
                        (page === data.totalPages - 1 && filters.page < data.totalPages - 2)
                      ) {
                        return <span key={page} className="h-8 w-8 flex items-center justify-center text-gray-400">…</span>;
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(filters.page + 1)}
                    disabled={filters.page >= data.totalPages}
                    className="gap-1"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
