import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareClient } from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Colleges — CollegeQuest",
  description: "Compare colleges side-by-side on fees, placements, ratings, and more.",
};

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">Loading comparison...</div>}>
      <CompareClient />
    </Suspense>
  );
}
