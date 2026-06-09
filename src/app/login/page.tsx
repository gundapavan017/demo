"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    // Mock auth
    if (data.email === "demo@collegequest.in" && data.password === "demo123") {
      login({
        id: "u1",
        name: "Demo User",
        email: data.email,
        savedColleges: [],
        savedComparisons: [],
      });
      router.push("/dashboard");
    } else {
      setError("password", { message: "Invalid email or password. Try demo@collegequest.in / demo123" });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-xl mb-2">
              <GraduationCap className="h-7 w-7" />
              CollegeQuest
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Demo hint */}
          <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700">
            <strong>Demo credentials:</strong><br />
            Email: demo@collegequest.in<br />
            Password: demo123
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register("password")}
                  className={errors.password ? "border-red-400 focus-visible:ring-red-400 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
              ) : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
