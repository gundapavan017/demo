"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, GraduationCap, GitCompare, BookmarkCheck, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compare.store";
import { useAuthStore } from "@/store/auth.store";
import { useSavedStore } from "@/store/saved.store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/colleges", label: "Colleges" },
  { href: "/compare", label: "Compare" },
  { href: "/predictor", label: "Predictor" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { selectedIds } = useCompareStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { savedCollegeIds } = useSavedStore();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-blue-600 text-xl">
            <GraduationCap className="h-7 w-7" />
            <span className="hidden sm:block">CollegeQuest</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {link.label}
                {link.href === "/compare" && selectedIds.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">
                    {selectedIds.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard/saved" aria-label="Saved colleges">
                  <Button variant="ghost" size="icon" className="relative">
                    <BookmarkCheck className="h-5 w-5" />
                    {savedCollegeIds.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white">
                        {savedCollegeIds.length}
                      </span>
                    )}
                  </Button>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="hidden sm:block font-medium">{user?.name?.split(" ")[0]}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link href="/dashboard/saved" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <BookmarkCheck className="h-4 w-4" /> Saved Colleges
                      </Link>
                      <Link href="/compare" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <GitCompare className="h-4 w-4" /> Compare ({selectedIds.length})
                      </Link>
                      <div className="my-1 border-t border-gray-100" />
                      <button onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium",
                  pathname.startsWith(link.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {link.label}
                {link.href === "/compare" && selectedIds.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-blue-600 px-1.5 text-[10px] text-white">
                    {selectedIds.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
