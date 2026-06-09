"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, TrendingUp, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CollegeCard } from "@/components/college/CollegeCard";
import { MOCK_COLLEGES } from "@/lib/mock-data/colleges";
import { College } from "@/types";

const schema = z.object({
  exam: z.string().min(1, "Please select an exam"),
  rank: z
    .string()
    .min(1, "Please enter your rank")
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 1, "Please enter a valid rank (minimum 1)")
    .refine((v) => Number(v) <= 1000000, "Rank must be at most 10,00,000"),
  category: z.string().min(1, "Please select a category"),
});

type FormData = z.infer<typeof schema>;

const EXAMS = ["JEE Main", "JEE Advanced", "BITSAT", "WBJEE", "MHT CET", "KCET", "VITEEE", "CAT"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];

function predictColleges(exam: string, rank: number): College[] {
  // Simplified rank-to-college matching logic
  const maxRank = exam === "JEE Advanced" ? 5000 : exam === "JEE Main" ? 100000 : 50000;
  const percentile = Math.max(0, 100 - (rank / maxRank) * 100);

  return MOCK_COLLEGES
    .filter((c) => {
      if (exam === "JEE Advanced") return c.tags.includes("IIT");
      if (exam === "JEE Main") return c.type === "Government";
      if (exam === "CAT") return c.tags.includes("IIM") || c.tags.includes("MBA");
      return true;
    })
    .filter((c) => {
      const ratingThreshold = (percentile / 100) * 5;
      return c.rating <= ratingThreshold + 1;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
}

export default function PredictorPage() {
  const [results, setResults] = useState<College[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ exam: string; rank: string; category: string } | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedExam = watch("exam");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSubmittedData(data);
    await new Promise((r) => setTimeout(r, 1000));
    const predicted = predictColleges(data.exam, Number(data.rank));
    setResults(predicted);
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 mb-4">
          <TrendingUp className="h-7 w-7 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">College Predictor</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Enter your exam and rank to discover colleges you&apos;re likely to get admission in.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Entrance Exam</label>
            <Select onValueChange={(v) => setValue("exam", v)}>
              <SelectTrigger className={errors.exam ? "border-red-400" : ""}>
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                {EXAMS.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.exam && <p className="mt-1 text-xs text-red-500">{errors.exam.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Rank
              {selectedExam && (
                <span className="ml-2 text-xs text-gray-400 font-normal">
                  ({selectedExam === "JEE Advanced" ? "1 – 5,000" : "1 – 1,00,000"})
                </span>
              )}
            </label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 1500"
              {...register("rank")}
              className={errors.rank ? "border-red-400" : ""}
            />
            {errors.rank && <p className="mt-1 text-xs text-red-500">{errors.rank.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <Select onValueChange={(v) => setValue("category", v)}>
              <SelectTrigger className={errors.category ? "border-red-400" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Predicting...</> : "Predict Colleges"}
          </Button>
        </form>
      </div>

      {/* Results */}
      {results !== null && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Predicted Colleges
              {submittedData && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  for {submittedData.exam} Rank {Number(submittedData.rank).toLocaleString()}
                </span>
              )}
            </h2>
            <span className="text-sm text-gray-500">{results.length} colleges found</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No colleges found for this rank. Try a different exam or rank range.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((college) => <CollegeCard key={college.id} college={college} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
