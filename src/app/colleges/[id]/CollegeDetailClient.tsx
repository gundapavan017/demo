"use client";
import { useCollege } from "@/hooks/useColleges";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Star, Phone, Mail, Globe, GitCompare, BookmarkPlus, BookmarkCheck,
  TrendingUp, IndianRupee, Users, Award, ChevronRight, CheckCircle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { RatingStars } from "@/components/shared/RatingStars";
import { useCompareStore } from "@/store/compare.store";
import { useSavedStore } from "@/store/saved.store";
import { formatCurrency } from "@/lib/utils";
import type { Review } from "@/types";

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            {review.userName[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{review.userName}</p>
            <p className="text-xs text-gray-500">{review.course} · Batch {review.batch}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{review.content}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg bg-green-50 p-3">
          <p className="text-xs font-semibold text-green-700 mb-1">Pros</p>
          <p className="text-xs text-green-600">{review.pros}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-700 mb-1">Cons</p>
          <p className="text-xs text-red-600">{review.cons}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">{review.helpful} people found this helpful</p>
    </div>
  );
}

export function CollegeDetailClient({ id }: { id: string }) {
  const { data: college, isLoading, isError, refetch } = useCollege(id);
  const { isSelected, addCollege, removeCollege, canAdd } = useCompareStore();
  const { isSaved, toggleSaved } = useSavedStore();

  if (isLoading) return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );

  if (isError || !college) return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <ErrorState onRetry={refetch} />
    </div>
  );

  const selected = isSelected(college.id);
  const saved = isSaved(college.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reviews = (college as any).reviews as Review[] | undefined ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/colleges" className="hover:text-blue-600">Colleges</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-800 font-medium truncate">{college.name}</span>
      </nav>

      {/* Hero Image */}
      <div className="relative h-52 sm:h-72 rounded-2xl overflow-hidden bg-gray-200 mb-6">
        <Image
          src={college.image}
          alt={college.name}
          fill
          priority
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/1200x400/e2e8f0/64748b?text=${encodeURIComponent(college.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <Badge variant={college.type === "Government" ? "success" : college.type === "Deemed" ? "warning" : "default"} className="text-sm px-3 py-1">
            {college.type}
          </Badge>
          {college.ranking.nirf && (
            <div className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900">
              NIRF #{college.ranking.nirf}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{college.name}</h1>
                <div className="flex items-center gap-1.5 mt-1.5 text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{college.address}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {college.accreditation.map((a) => (
                    <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                  ))}
                  {college.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSaved(college.id)}
                  className="gap-1.5"
                >
                  {saved ? <BookmarkCheck className="h-4 w-4 text-blue-600" /> : <BookmarkPlus className="h-4 w-4" />}
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button
                  variant={selected ? "default" : "outline"}
                  size="sm"
                  onClick={() => selected ? removeCollege(college.id) : canAdd() && addCollege(college.id)}
                  disabled={!selected && !canAdd()}
                  className="gap-1.5"
                >
                  <GitCompare className="h-4 w-4" />
                  {selected ? "Added" : "Compare"}
                </Button>
              </div>
            </div>

            {/* Rating row */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <RatingStars rating={college.rating} size="lg" />
                <span className="text-sm text-gray-500">({college.reviewCount} reviews)</span>
              </div>
              <div className="text-sm text-gray-500">Est. {college.established}</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: IndianRupee, label: "Avg Fees/yr", value: formatCurrency(college.fees.average), color: "text-green-600" },
              { icon: TrendingUp, label: "Avg Package", value: formatCurrency(college.placements.averagePackage), color: "text-blue-600" },
              { icon: Award, label: "Placement Rate", value: `${college.placements.placementRate}%`, color: "text-purple-600" },
              { icon: Users, label: "Reviews", value: college.reviewCount.toString(), color: "text-orange-600" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <stat.icon className={`h-5 w-5 mx-auto mb-1.5 ${stat.color}`} />
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start overflow-x-auto h-auto flex-nowrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-3">About {college.name}</h3>
                <p className="text-gray-600 leading-relaxed">{college.overview}</p>
                <div className="mt-5">
                  <h4 className="font-medium text-gray-800 mb-3">Campus Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.facilities.map((f) => (
                      <div key={f} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-4">
              <div className="space-y-3">
                {college.courses.map((course) => (
                  <div key={course.id} className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-gray-500">
                          <span>{course.duration}</span>
                          <span>·</span>
                          <span>{course.seats} seats</span>
                          <span>·</span>
                          <Badge variant="outline" className="text-xs">{course.mode}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(course.fees)}<span className="text-xs text-gray-400 font-normal">/yr</span></p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 bg-blue-50 rounded-lg px-3 py-2">
                      Eligibility: {course.eligibility}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="placements" className="mt-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Average Package", value: formatCurrency(college.placements.averagePackage) },
                    { label: "Highest Package", value: formatCurrency(college.placements.highestPackage) },
                    { label: "Placement Rate", value: `${college.placements.placementRate}%` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-blue-50 p-4 text-center">
                      <p className="text-2xl font-bold text-blue-700">{item.value}</p>
                      <p className="text-sm text-blue-600 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Top Recruiters</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.placements.topRecruiters.map((r) => (
                      <div key={r} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700">
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              {reviews.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Star className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Contact & Info</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${college.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                {college.phone}
              </a>
              <a href={`mailto:${college.email}`} className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="truncate">{college.email}</span>
              </a>
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:underline">
                <Globe className="h-4 w-4 text-gray-400 shrink-0" />
                Official Website
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Fee Structure</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Minimum</span>
                <span className="font-medium">{formatCurrency(college.fees.min)}/yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Maximum</span>
                <span className="font-medium">{formatCurrency(college.fees.max)}/yr</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                <span className="font-medium text-gray-800">Average</span>
                <span className="font-bold text-blue-600">{formatCurrency(college.fees.average)}/yr</span>
              </div>
            </div>
          </div>

          {college.ranking.qs && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
              <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">QS World Ranking</p>
              <p className="text-3xl font-bold text-amber-700">#{college.ranking.qs}</p>
            </div>
          )}

          <Link href={`/compare?ids=${college.id}`} className="block">
            <Button className="w-full gap-2">
              <GitCompare className="h-4 w-4" /> Add to Compare
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
