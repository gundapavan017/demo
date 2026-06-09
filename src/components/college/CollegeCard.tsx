"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, BookmarkPlus, BookmarkCheck, GitCompare, TrendingUp, IndianRupee } from "lucide-react";
import { College } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compare.store";
import { useSavedStore } from "@/store/saved.store";
import { formatCurrency, cn } from "@/lib/utils";

interface CollegeCardProps {
  college: College;
  variant?: "default" | "compact";
}

export function CollegeCard({ college, variant = "default" }: CollegeCardProps) {
  const { isSelected, addCollege, removeCollege, canAdd } = useCompareStore();
  const { isSaved, toggleSaved } = useSavedStore();

  const selected = isSelected(college.id);
  const saved = isSaved(college.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected) removeCollege(college.id);
    else if (canAdd()) addCollege(college.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(college.id);
  };

  return (
    <article
      className={cn(
        "group relative rounded-xl border bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        selected ? "border-blue-400 ring-2 ring-blue-200" : "border-gray-200"
      )}
      aria-label={`${college.name} card`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          src={college.image}
          alt={college.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e2e8f0/64748b?text=${encodeURIComponent(college.name.split(" ")[0])}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={college.type === "Government" ? "success" : college.type === "Deemed" ? "warning" : "default"}>
            {college.type}
          </Badge>
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            onClick={handleSave}
            aria-label={saved ? "Remove from saved" : "Save college"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition-colors hover:bg-white"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-blue-600" />
            ) : (
              <BookmarkPlus className="h-4 w-4 text-gray-600" />
            )}
          </button>
          <button
            onClick={handleCompare}
            aria-label={selected ? "Remove from compare" : "Add to compare"}
            disabled={!selected && !canAdd()}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full shadow transition-colors",
              selected
                ? "bg-blue-600 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white disabled:opacity-40"
            )}
          >
            <GitCompare className="h-4 w-4" />
          </button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-800">{college.rating}</span>
          <span className="text-xs text-gray-500">({college.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <Link href={`/colleges/${college.id}`} className="block p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
          {college.name}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{college.location}</span>
        </div>

        {college.ranking.nirf && (
          <p className="mt-1 text-xs text-blue-600 font-medium">
            NIRF Rank #{college.ranking.nirf}
          </p>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
          <div className="flex items-start gap-1.5">
            <IndianRupee className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Avg Fees</p>
              <p className="text-sm font-semibold text-gray-800">{formatCurrency(college.fees.average)}<span className="text-xs text-gray-400">/yr</span></p>
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Avg Package</p>
              <p className="text-sm font-semibold text-gray-800">{formatCurrency(college.placements.averagePackage)}</p>
            </div>
          </div>
        </div>

        {variant === "default" && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {college.accreditation.slice(0, 2).map((acc) => (
              <Badge key={acc} variant="secondary" className="text-[10px]">{acc}</Badge>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
