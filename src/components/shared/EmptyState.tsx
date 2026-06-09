import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFiltersStore } from "@/store/filters.store";

interface EmptyStateProps {
  title?: string;
  message?: string;
  showReset?: boolean;
}

export function EmptyState({
  title = "No colleges found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  showReset = true,
}: EmptyStateProps) {
  const { resetFilters } = useFiltersStore();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
        <Search className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>
      {showReset && (
        <Button onClick={resetFilters} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" /> Reset Filters
        </Button>
      )}
    </div>
  );
}
