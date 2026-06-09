import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function toClientCollege(c: any) {
  return {
    id: c.slug, // use slug as id so existing hooks work
    name: c.name,
    slug: c.slug,
    location: c.location,
    city: c.city,
    state: c.state,
    type: c.type.charAt(0) + c.type.slice(1).toLowerCase(), // "GOVERNMENT" -> "Government"
    established: c.established,
    rating: c.rating,
    reviewCount: c.reviewCount,
    fees: { min: c.feesMin, max: c.feesMax, average: c.feesAverage },
    placements: {
      averagePackage: c.avgPackage,
      highestPackage: c.highestPkg,
      placementRate: c.placementRate,
      topRecruiters: c.topRecruiters,
    },
    overview: c.overview,
    accreditation: c.accreditation,
    ranking: { nirf: c.nirfRank, qs: c.qsRank },
    image: c.image,
    logo: c.logo,
    website: c.website,
    phone: c.phone,
    email: c.email,
    address: c.address,
    facilities: c.facilities,
    tags: c.tags,
    isFeatured: c.isFeatured,
    courses: (c.courses || []).map((course: any) => ({
      id: course.id,
      name: course.name,
      duration: course.duration,
      fees: course.fees,
      seats: course.seats,
      eligibility: course.eligibility,
      mode: course.mode === "FULL_TIME" ? "Full-time" : course.mode === "PART_TIME" ? "Part-time" : "Distance",
    })),
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const feesMin = Number(searchParams.get("feesMin") || 0);
  const feesMax = Number(searchParams.get("feesMax") || 10000000);
  const ratingMin = Number(searchParams.get("ratingMin") || 0);
  const sortBy = searchParams.get("sortBy") || "rating";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 9);

  const where: any = {
    feesAverage: { gte: feesMin, lte: feesMax },
    rating: { gte: ratingMin },
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
      { tags: { hasSome: [search] } },
    ];
  }

  if (location && location !== "All States") {
    where.state = location;
  }

  if (type && type !== "All Types") {
    where.type = type.toUpperCase();
  }

  const orderBy: any =
    sortBy === "fees_asc" ? { feesAverage: "asc" }
    : sortBy === "fees_desc" ? { feesAverage: "desc" }
    : sortBy === "name" ? { name: "asc" }
    : sortBy === "placement" ? { avgPackage: "desc" }
    : { rating: "desc" };

  const [total, colleges] = await Promise.all([
    prisma.college.count({ where }),
    prisma.college.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { courses: true },
    }),
  ]);

  const data = colleges.map(toClientCollege);
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({ data, total, page, limit, totalPages });
}
