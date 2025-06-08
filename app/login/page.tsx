"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import IconGoogle from "@/public/icons/IconGoogle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Normally you'd call your auth API here or use `signIn` from next-auth with credentials
    console.log("Login form data:", formData);
    router.push("/"); // On success
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side with Welcome */}
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
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
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
              className="mt-2"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-2"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" className="w-full text-base font-semibold">
            Log In
          </Button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
