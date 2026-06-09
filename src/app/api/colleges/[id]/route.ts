import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const college = await prisma.college.findFirst({
    where: { OR: [{ slug: id }, { id }] },
    include: {
      courses: true,
      reviews: {
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!college) {
    return NextResponse.json({ message: "College not found" }, { status: 404 });
  }

  const result = {
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
    reviews: college.reviews.map((r) => ({
      id: r.id,
      collegeId: college.slug,
      userId: r.userId,
      userName: r.user.name,
      userAvatar: r.user.avatar,
      rating: r.rating,
      title: r.title,
      content: r.content,
      pros: r.pros,
      cons: r.cons,
      batch: r.batch,
      course: r.course,
      helpful: r.helpful,
      createdAt: r.createdAt.toISOString(),
    })),
  };

  return NextResponse.json(result);
}
