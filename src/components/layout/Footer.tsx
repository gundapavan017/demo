import Link from "next/link";
import { GraduationCap, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-3">
              <GraduationCap className="h-6 w-6" />
              CollegeQuest
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              India&apos;s most trusted college discovery platform. Find, compare, and choose the right college for your future.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="X / Twitter" className="text-gray-400 hover:text-gray-600 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-600 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-gray-600 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Discover</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/colleges" className="hover:text-gray-900">All Colleges</Link></li>
              <li><Link href="/colleges?type=Government" className="hover:text-gray-900">Government Colleges</Link></li>
              <li><Link href="/colleges?type=Private" className="hover:text-gray-900">Private Colleges</Link></li>
              <li><Link href="/compare" className="hover:text-gray-900">Compare Colleges</Link></li>
              <li><Link href="/predictor" className="hover:text-gray-900">College Predictor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/login" className="hover:text-gray-900">Login</Link></li>
              <li><Link href="/register" className="hover:text-gray-900">Register</Link></li>
              <li><Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link></li>
              <li><Link href="/dashboard/saved" className="hover:text-gray-900">Saved Colleges</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CollegeQuest. Built with Next.js 15 · TypeScript · Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
