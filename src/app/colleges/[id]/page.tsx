import type { Metadata } from "next";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";
import { CollegeDetailClient } from "./CollegeDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const college = MOCK_COLLEGES.find((c) => c.id === id || c.slug === id);
  return {
    title: college ? `${college.name} — CollegeQuest` : "College — CollegeQuest",
    description: college?.overview?.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return MOCK_COLLEGES.map((c) => ({ id: c.id }));
}

export default async function CollegeDetailPage({ params }: Props) {
  const { id } = await params;
  return <CollegeDetailClient id={id} />;
}
