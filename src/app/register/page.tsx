"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GraduationCap, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      savedColleges: [],
      savedComparisons: [],
    });
    router.push("/dashboard");
  };

  const perks = [
    "Save your favorite colleges",
    "Compare and track colleges",
    "Get personalized recommendations",
    "Access placement insights",
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Perks */}
        <div className="hidden lg:flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your college journey starts here
          </h2>
          <p className="text-gray-500 mb-8">
            Join over 1 million students who use CollegeQuest to make informed admission decisions.
          </p>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-gray-700">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-xl mb-2">
              <GraduationCap className="h-7 w-7" />
              CollegeQuest
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Start your college discovery journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <Input
                id="name"
                placeholder="Rahul Sharma"
                autoComplete="name"
                {...register("name")}
                className={errors.name ? "border-red-400" : ""}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                className={errors.email ? "border-red-400" : ""}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  {...register("password")}
                  className={errors.password ? "border-red-400 pr-10" : "pr-10"}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-red-400" : ""}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
