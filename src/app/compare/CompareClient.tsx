"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCompareColleges } from "@/hooks/useColleges";
import { useCompareStore } from "@/store/compare.store";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Check, Minus, Star, MapPin, TrendingUp, IndianRupee, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { formatCurrency, cn } from "@/lib/utils";
import { College } from "@/types";

function BestIndicator({ isBest }: { isBest: boolean }) {
  if (!isBest) return null;
  return (
    <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
      <Check className="h-2.5 w-2.5 text-white" />
    </span>
  );
}

function CompareRow({
  label, values, format, bestFn, icon: Icon,
}: {
  label: string;
  values: (number | string | undefined)[];
  format?: (v: number | string) => string;
  bestFn?: (vals: (number | string | undefined)[]) => number;
  icon?: React.ElementType;
}) {
  const bestIdx = bestFn ? bestFn(values) : -1;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="py-3.5 px-4 text-sm font-medium text-gray-600 w-40">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-gray-400" />} {label}
        </div>
      </td>
      {values.map((val, i) => (
        <td key={i} className={cn("py-3.5 px-4 text-sm text-center font-medium", i === bestIdx ? "text-green-700" : "text-gray-800")}>
          {val !== undefined && val !== null
            ? <>
                {format ? format(val) : String(val)}
                <BestIndicator isBest={i === bestIdx} />
              </>
            : <Minus className="h-4 w-4 text-gray-300 mx-auto" />
          }
        </td>
      ))}
    </tr>
  );
}

export function CompareClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedIds, addCollege, removeCollege } = useCompareStore();

  const idsFromUrl = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
  const ids = idsFromUrl.length >= 2 ? idsFromUrl : selectedIds;

  const { data, isLoading, isError, refetch } = useCompareColleges(ids);
  const colleges: College[] = data?.colleges ?? [];

  const availableToAdd = MOCK_COLLEGES.filter((c) => !ids.includes(c.id)).slice(0, 6);

  const handleRemove = (id: string) => {
    const newIds = ids.filter((i) => i !== id);
    removeCollege(id);
    if (newIds.length >= 2) router.push(`/compare?ids=${newIds.join(",")}`);
    else if (newIds.length === 1) router.push(`/compare?ids=${newIds[0]}`);
    else router.push("/compare");
  };

  const handleAdd = (id: string) => {
    addCollege(id);
    const newIds = [...ids, id];
    router.push(`/compare?ids=${newIds.join(",")}`);
  };

  if (ids.length < 2) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Compare Colleges</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Select 2–3 colleges to compare side-by-side. Browse colleges and use the compare button on each card.
        </p>
        <Link href="/colleges">
          <Button className="gap-2">Browse Colleges to Compare</Button>
        </Link>

        {ids.length === 1 && (
          <div className="mt-10">
            <p className="text-sm text-gray-500 mb-4">Add one more college to start comparing:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              {availableToAdd.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleAdd(c.id)}
                  className="rounded-xl border border-dashed border-gray-300 p-3 text-left hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.city}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isLoading) return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="overflow-x-auto">
        <div className="grid gap-4" style={{ gridTemplateColumns: `160px repeat(${ids.length}, 1fr)` }}>
          {Array.from({ length: ids.length + 1 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <ErrorState onRetry={refetch} />
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Comparison</h1>
          <p className="text-gray-500 text-sm mt-0.5">Comparing {colleges.length} colleges</p>
        </div>
        <Link href="/colleges">
          <Button variant="outline" size="sm">+ Add More</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px]">
          {/* College headers */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-4 px-4 text-left text-sm font-semibold text-gray-500 w-40">
                College
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="py-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative h-20 w-full max-w-[180px] rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={college.image}
                        alt={college.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/400x200/e2e8f0/64748b?text=${encodeURIComponent(college.name.split(" ")[0])}`;
                        }}
                      />
                    </div>
                    <Link href={`/colleges/${college.id}`} className="text-sm font-semibold text-blue-600 hover:underline text-center line-clamp-2 max-w-[160px]">
                      {college.name}
                    </Link>
                    <button
                      onClick={() => handleRemove(college.id)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </th>
              ))}
              {colleges.length < 3 && (
                <th className="py-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full max-w-[180px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <Link href="/colleges" className="text-sm font-medium text-blue-600 hover:underline">
                      Add College
                    </Link>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {/* Section: General */}
            <tr className="bg-blue-50">
              <td colSpan={colleges.length + 2} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-blue-700">
                General Info
              </td>
            </tr>
            <CompareRow
              label="Location"
              values={colleges.map((c) => c.city)}
              icon={MapPin}
            />
            <CompareRow
              label="Type"
              values={colleges.map((c) => c.type)}
            />
            <CompareRow
              label="Established"
              values={colleges.map((c) => c.established)}
              bestFn={(vals) => vals.indexOf(Math.min(...vals.map(Number)))}
            />
            <CompareRow
              label="Rating"
              values={colleges.map((c) => c.rating)}
              format={(v) => `${v} ⭐`}
              bestFn={(vals) => vals.indexOf(Math.max(...vals.map(Number)))}
              icon={Star}
            />
            <CompareRow
              label="NIRF Rank"
              values={colleges.map((c) => c.ranking.nirf)}
              bestFn={(vals) => vals.indexOf(Math.min(...vals.filter((v) => v !== undefined).map(Number)))}
              icon={Award}
            />

            {/* Section: Fees */}
            <tr className="bg-green-50">
              <td colSpan={colleges.length + 2} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-green-700">
                Fees (per year)
              </td>
            </tr>
            <CompareRow
              label="Min Fees"
              values={colleges.map((c) => c.fees.min)}
              format={(v) => formatCurrency(Number(v))}
              bestFn={(vals) => vals.indexOf(Math.min(...vals.map(Number)))}
              icon={IndianRupee}
            />
            <CompareRow
              label="Avg Fees"
              values={colleges.map((c) => c.fees.average)}
              format={(v) => formatCurrency(Number(v))}
              bestFn={(vals) => vals.indexOf(Math.min(...vals.map(Number)))}
            />
            <CompareRow
              label="Max Fees"
              values={colleges.map((c) => c.fees.max)}
              format={(v) => formatCurrency(Number(v))}
              bestFn={(vals) => vals.indexOf(Math.min(...vals.map(Number)))}
            />

            {/* Section: Placements */}
            <tr className="bg-purple-50">
              <td colSpan={colleges.length + 2} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-purple-700">
                Placements
              </td>
            </tr>
            <CompareRow
              label="Avg Package"
              values={colleges.map((c) => c.placements.averagePackage)}
              format={(v) => formatCurrency(Number(v))}
              bestFn={(vals) => vals.indexOf(Math.max(...vals.map(Number)))}
              icon={TrendingUp}
            />
            <CompareRow
              label="Highest Pkg"
              values={colleges.map((c) => c.placements.highestPackage)}
              format={(v) => formatCurrency(Number(v))}
              bestFn={(vals) => vals.indexOf(Math.max(...vals.map(Number)))}
            />
            <CompareRow
              label="Placement %"
              values={colleges.map((c) => c.placements.placementRate)}
              format={(v) => `${v}%`}
              bestFn={(vals) => vals.indexOf(Math.max(...vals.map(Number)))}
            />
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
            <Check className="h-2.5 w-2.5 text-white" />
          </span>
          Best in this category
        </span>
      </div>
    </div>
  );
}
