"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookmarkCheck, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useSavedStore } from "@/store/saved.store";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";
import { CollegeCard } from "@/components/college/CollegeCard";
import { Button } from "@/components/ui/button";

export default function SavedPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { savedCollegeIds } = useSavedStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const savedColleges = MOCK_COLLEGES.filter((c) => savedCollegeIds.includes(c.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-800 font-medium">Saved Colleges</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Colleges</h1>
          <p className="text-gray-500 text-sm mt-0.5">{savedColleges.length} colleges saved</p>
        </div>
        {savedColleges.length > 0 && (
          <Link href="/compare">
            <Button variant="outline" size="sm">Compare Saved</Button>
          </Link>
        )}
      </div>

      {savedColleges.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
            <BookmarkCheck className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No saved colleges yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Browse colleges and click the bookmark icon to save them here for easy access.
          </p>
          <Link href="/colleges">
            <Button>Browse Colleges</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
}
