"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookmarkCheck, GitCompare, GraduationCap, TrendingUp, User } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useSavedStore } from "@/store/saved.store";
import { useCompareStore } from "@/store/compare.store";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";
import { CollegeCard } from "@/components/college/CollegeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { savedCollegeIds } = useSavedStore();
  const { selectedIds } = useCompareStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const savedColleges = MOCK_COLLEGES.filter((c) => savedCollegeIds.includes(c.id)).slice(0, 3);

  const stats = [
    { icon: BookmarkCheck, label: "Saved Colleges", value: savedCollegeIds.length, href: "/dashboard/saved", color: "text-blue-600 bg-blue-50" },
    { icon: GitCompare, label: "In Comparison", value: selectedIds.length, href: "/compare", color: "text-purple-600 bg-purple-50" },
    { icon: GraduationCap, label: "Colleges Explored", value: MOCK_COLLEGES.length, href: "/colleges", color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold">
          {getInitials(user.name)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved Colleges preview */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Saved Colleges</h2>
            <Link href="/dashboard/saved">
              <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
            </Link>
          </div>
          {savedColleges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedColleges.map((c) => <CollegeCard key={c.id} college={c} variant="compact" />)}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <BookmarkCheck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm mb-4">No saved colleges yet</p>
                <Link href="/colleges">
                  <Button size="sm">Browse Colleges</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/colleges" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Search Colleges</p>
                  <p className="text-xs text-gray-500">Explore 5,000+ colleges</p>
                </div>
              </Link>
              <Link href="/compare" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <GitCompare className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Compare Colleges</p>
                  <p className="text-xs text-gray-500">{selectedIds.length > 0 ? `${selectedIds.length} selected` : "Start comparing"}</p>
                </div>
              </Link>
              <Link href="/predictor" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">College Predictor</p>
                  <p className="text-xs text-gray-500">Find colleges by rank</p>
                </div>
              </Link>
              <Link href="/dashboard/saved" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <User className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">My Saved List</p>
                  <p className="text-xs text-gray-500">{savedCollegeIds.length} colleges saved</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
