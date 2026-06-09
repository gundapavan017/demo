import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function RatingStars({ rating, maxRating = 5, size = "md", showValue = true }: RatingStarsProps) {
  const starSizes = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSizes[size],
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                ? "fill-yellow-200 text-yellow-400"
                : "fill-gray-200 text-gray-300"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("font-semibold text-gray-700", textSizes[size])}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
