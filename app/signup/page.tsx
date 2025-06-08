"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react"
import IconGoogle from "@/public/icons/IconGoogle";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation or API call
    console.log("Form submitted", formData);
  };

  const handleGoogleSignIn = async () => {
     await signIn("google")
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side (optional image or message) */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-10 hidden md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to EduCrack</h2>
          <p className="text-sm text-gray-100">
            Practice thousands of questions and crack your next exam with
            confidence.
          </p>
          <img
            src="/assets/images/signup.svg"
            alt="Signup Illustration"
            className="mt-10 w-full"
          />
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Create your account
          </h2>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-sm"
            type="button"
          >
            <IconGoogle />
            Continue with Google
          </Button>

          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                className="mt-2"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                className="mt-2"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              className="mt-2"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              className="mt-2"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-2"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              className="mt-2"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full text-base font-semibold">
            Sign Up
          </Button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
