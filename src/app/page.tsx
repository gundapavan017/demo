import Link from "next/link";
import { ArrowRight, Search, GitCompare, Star, TrendingUp, Shield, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollegeCard } from "@/components/college/CollegeCard";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";

const featured = MOCK_COLLEGES.filter((c) => c.isFeatured).slice(0, 3);

const stats = [
  { label: "Colleges Listed", value: "5,000+" },
  { label: "Cities Covered", value: "300+" },
  { label: "Students Helped", value: "1M+" },
  { label: "Reviews", value: "50K+" },
];

const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description: "Search by name, location, fees, rating, and college type to find your perfect match.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: GitCompare,
    title: "Side-by-Side Compare",
    description: "Compare up to 3 colleges on fees, placements, ratings, and more.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Read authentic reviews from current students and alumni.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: TrendingUp,
    title: "Placement Insights",
    description: "Detailed placement statistics including average and highest packages.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: BookOpen,
    title: "Course Explorer",
    description: "Explore all courses, eligibility criteria, fees, and available seats.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Shield,
    title: "Trusted Data",
    description: "All data is sourced from official NIRF rankings and verified records.",
    color: "bg-red-100 text-red-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-24 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            5,000+ Colleges · Updated Daily
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Find Your{" "}
            <span className="text-yellow-300">Dream College</span>{" "}
            in India
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Search, compare, and discover top colleges with real data on fees, placements, and reviews — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/colleges">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2 w-full sm:w-auto shadow-lg">
                <Search className="h-5 w-5" /> Browse Colleges
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 w-full sm:w-auto">
                <GitCompare className="h-5 w-5" /> Compare Now
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/20 pt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                <div className="text-sm text-blue-200 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything You Need to Decide</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              CollegeQuest gives you all the tools to make an informed admission decision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.color} mb-4`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Ranked Colleges</h2>
              <p className="text-gray-500 text-sm mt-1">Based on NIRF rankings and student reviews</p>
            </div>
            <Link href="/colleges">
              <Button variant="outline" className="gap-2 hidden sm:flex">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/colleges">
              <Button variant="outline" className="gap-2">
                View All Colleges <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your College?</h2>
          <p className="text-blue-100 mb-8">
            Join over 1 million students who used CollegeQuest to make their admission decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/colleges">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                Browse Colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
