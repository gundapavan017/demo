"use client";
import { useRouter } from "next/navigation";
import { X, GitCompare, ArrowRight } from "lucide-react";
import { useCompareStore } from "@/store/compare.store";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CompareDrawer() {
  const { selectedIds, removeCollege, clearAll } = useCompareStore();
  const router = useRouter();

  if (selectedIds.length === 0) return null;

  const colleges = selectedIds.map((id) => MOCK_COLLEGES.find((c) => c.id === id)).filter(Boolean);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-2xl",
        "animate-in slide-in-from-bottom-4 duration-300"
      )}
      role="region"
      aria-label="College comparison tray"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <GitCompare className="h-5 w-5 text-blue-600 shrink-0" />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              Compare ({selectedIds.length}/3):
            </span>
            <div className="flex gap-2 overflow-x-auto">
              {colleges.map((college) => (
                college && (
                  <div
                    key={college.id}
                    className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm text-blue-800 whitespace-nowrap"
                  >
                    <span className="max-w-[120px] truncate">{college.name}</span>
                    <button
                      onClick={() => removeCollege(college.id)}
                      className="ml-0.5 rounded-full hover:bg-blue-200 p-0.5"
                      aria-label={`Remove ${college.name} from comparison`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )
              ))}
              {selectedIds.length < 3 && (
                <div className="flex items-center gap-1.5 rounded-full border-2 border-dashed border-gray-300 px-3 py-1 text-sm text-gray-400 whitespace-nowrap">
                  + Add college
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-gray-500">
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => router.push(`/compare?ids=${selectedIds.join(",")}`)}
              disabled={selectedIds.length < 2}
              className="gap-1.5"
            >
              Compare <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
