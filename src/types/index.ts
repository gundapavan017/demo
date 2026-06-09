export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  type: "Government" | "Private" | "Deemed" | "Autonomous";
  established: number;
  rating: number;
  reviewCount: number;
  fees: {
    min: number;
    max: number;
    average: number;
  };
  placements: {
    averagePackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string[];
  };
  courses: Course[];
  overview: string;
  accreditation: string[];
  ranking: {
    nirf?: number;
    qs?: number;
  };
  image: string;
  logo: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  facilities: string[];
  tags: string[];
  isFeatured: boolean;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats: number;
  eligibility: string;
  mode: "Full-time" | "Part-time" | "Distance";
}

export interface Review {
  id: string;
  collegeId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  pros: string;
  cons: string;
  batch: string;
  course: string;
  createdAt: string;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  savedColleges: string[];
  savedComparisons: ComparisonSet[];
}

export interface ComparisonSet {
  id: string;
  name: string;
  collegeIds: string[];
  createdAt: string;
}

export interface CollegeFilters {
  search: string;
  location: string;
  type: string;
  feesMin: number;
  feesMax: number;
  ratingMin: number;
  sortBy: "rating" | "fees_asc" | "fees_desc" | "name" | "placement";
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
