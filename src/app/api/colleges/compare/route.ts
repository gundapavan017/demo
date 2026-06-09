import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];

  if (ids.length < 2 || ids.length > 3) {
    return NextResponse.json(
      { message: "Please provide 2 or 3 college IDs" },
      { status: 400 }
    );
  }

  const colleges = await prisma.college.findMany({
    where: { slug: { in: ids } },
    include: { courses: true },
  });

  if (colleges.length === 0) {
    return NextResponse.json({ message: "One or more colleges not found" }, { status: 404 });
  }

  const result = colleges.map((college) => ({
    id: college.slug,
    name: college.name,
    slug: college.slug,
    location: college.location,
    city: college.city,
    state: college.state,
    type: college.type.charAt(0) + college.type.slice(1).toLowerCase(),
    established: college.established,
    rating: college.rating,
    reviewCount: college.reviewCount,
    fees: { min: college.feesMin, max: college.feesMax, average: college.feesAverage },
    placements: {
      averagePackage: college.avgPackage,
      highestPackage: college.highestPkg,
      placementRate: college.placementRate,
      topRecruiters: college.topRecruiters,
    },
    overview: college.overview,
    accreditation: college.accreditation,
    ranking: { nirf: college.nirfRank, qs: college.qsRank },
    image: college.image,
    logo: college.logo,
    website: college.website,
    phone: college.phone,
    email: college.email,
    address: college.address,
    facilities: college.facilities,
    tags: college.tags,
    isFeatured: college.isFeatured,
    courses: college.courses.map((c) => ({
      id: c.id,
      name: c.name,
      duration: c.duration,
      fees: c.fees,
      seats: c.seats,
      eligibility: c.eligibility,
      mode: c.mode === "FULL_TIME" ? "Full-time" : c.mode === "PART_TIME" ? "Part-time" : "Distance",
    })),
  }));

  return NextResponse.json({ colleges: result });
}
