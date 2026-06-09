import { Skeleton } from "@/components/ui/skeleton";

export function CollegeCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
