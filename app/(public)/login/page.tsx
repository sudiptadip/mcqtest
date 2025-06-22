"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import IconGoogle from "@/public/icons/IconGoogle";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ToastNotify from "@/components/commonJs/ToastNotify";
import { loginUser } from "@/lib/api/auth";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormData) => {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    });

    if (response?.isSuccess) {
      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: response.result.token }),
      });
      ToastNotify("Logged in successfully", "success");
      window.location.href = "/"
    } else {
      ToastNotify(response?.errorMessage.join(",") || "Login failed", "error");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-10 hidden md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-sm text-gray-100">
            Log in to continue your practice and boost your exam preparation.
          </p>
          <img
            src="/assets/images/signin.svg"
            alt="Login Illustration"
            className="mt-10 w-full"
          />
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Sign in to your account
          </h2>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <IconGoogle />
            Sign in with Google
          </Button>

          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="mt-2"
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="mt-2"
              placeholder="Enter your password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full text-base font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}