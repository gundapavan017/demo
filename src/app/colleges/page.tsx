import type { Metadata } from "next";
import { CollegesClient } from "./CollegesClient";

export const metadata: Metadata = {
  title: "Browse Colleges — CollegeQuest",
  description: "Search and filter from thousands of colleges in India by location, fees, rating, and more.",
};

export default function CollegesPage() {
  return <CollegesClient />;
}
