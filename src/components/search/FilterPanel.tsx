"use client";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useFiltersStore } from "@/store/filters.store";
import { INDIAN_STATES } from "@/lib/mock-data/colleges";
import { COLLEGE_TYPES, FEE_RANGES, SORT_OPTIONS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const RATING_OPTIONS = [
  { value: "0", label: "Any Rating" },
  { value: "3", label: "3+ Stars" },
  { value: "3.5", label: "3.5+ Stars" },
  { value: "4", label: "4+ Stars" },
  { value: "4.5", label: "4.5+ Stars" },
];

export function FilterPanel() {
  const { filters, setFilter, resetFilters } = useFiltersStore();

  const hasActiveFilters =
    filters.location || filters.type || filters.feesMin > 0 ||
    filters.feesMax < 10000000 || filters.ratingMin > 0 || filters.sortBy !== "rating";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          Filters
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 gap-1 text-xs text-gray-500">
            <RotateCcw className="h-3 w-3" /> Reset
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Sort By</label>
          <Select
            value={filters.sortBy}
            onValueChange={(v) => setFilter("sortBy", v as typeof filters.sortBy)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">State</label>
          <Select
            value={filters.location || "All States"}
            onValueChange={(v) => setFilter("location", v === "All States" ? "" : v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">College Type</label>
          <Select
            value={filters.type || "All Types"}
            onValueChange={(v) => setFilter("type", v === "All Types" ? "" : v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {COLLEGE_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fee Range */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Fee Range (per year)</label>
          <div className="flex flex-wrap gap-1.5">
            {FEE_RANGES.map((range) => {
              const active = filters.feesMin === range.min && filters.feesMax === range.max;
              return (
                <button
                  key={range.label}
                  onClick={() => {
                    setFilter("feesMin", range.min);
                    setFilter("feesMax", range.max);
                  }}
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                    active
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Minimum Rating</label>
          <Select
            value={String(filters.ratingMin)}
            onValueChange={(v) => setFilter("ratingMin", Number(v))}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RATING_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
