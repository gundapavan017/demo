"use client";
import { useRef } from "react";
import { Search, X } from "lucide-react";
import { useFiltersStore } from "@/store/filters.store";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
}

export function SearchBar({ placeholder = "Search colleges, courses, locations...", className, size = "default" }: SearchBarProps) {
  const { filters, setSearch } = useFiltersStore();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative", className)}>
      <Search className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
        size === "lg" ? "h-5 w-5 left-4" : "h-4 w-4"
      )} />
      <input
        ref={inputRef}
        type="search"
        value={filters.search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        aria-label="Search colleges"
        className={cn(
          "w-full rounded-xl border border-gray-300 bg-white pr-10 text-gray-900 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "transition-shadow duration-200",
          size === "lg"
            ? "pl-12 py-3.5 text-base shadow-sm"
            : "pl-9 py-2 text-sm"
        )}
      />
      {filters.search && (
        <button
          onClick={() => { setSearch(""); inputRef.current?.focus(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
