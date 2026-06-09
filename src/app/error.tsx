"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
