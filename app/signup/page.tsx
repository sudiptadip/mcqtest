"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import IconGoogle from "@/public/icons/IconGoogle";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "@/lib/api/auth";
import ToastNotify from "@/components/commonJs/ToastNotify";
import { ToastType } from "@/lib/SD";
import router from "next/router";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Yup schema for validation
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Phone number is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/\d/, "Password must have at least one number")
    .matches(/[@$!%*?&]/, "Password must have at least one special character"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: FormData) => {
    const response = await registerUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phoneNumber: data.phone,
    });

    if (response.isSuccess) {
      ToastNotify("Successfully register user", ToastType.success);
      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: response.result.token }),
      });
      router.push("/dashboard");
    } else {
      ToastNotify(response.errorMessage.join(", "), ToastType.error);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 space-y-5"
          noValidate
        >
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
                id="firstName"
                {...register("firstName")}
                className="mt-2"
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className="mt-2"
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="mt-2"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="mt-2"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone.message}
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
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
              tabIndex={-1}
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

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="mt-2"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
