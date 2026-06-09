import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-7xl font-black text-gray-200 mb-4">404</div>
      <GraduationCap className="h-12 w-12 text-blue-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/colleges">
          <Button variant="outline">Browse Colleges</Button>
        </Link>
      </div>
    </div>
  );
}
