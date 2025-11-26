"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // client-side only
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    toast.loading("Submitting...");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      toast.dismiss();
      toast.error("Login failed! Check your email and password.");
      return;
    }

    toast.dismiss();
    toast.success("Login successful!");
    router.push(callbackUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="border w-full px-4 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="border w-full px-4 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button className="w-full bg-red-500 text-white py-2 rounded-md">
        Log In
      </button>

      {/* SOCIAL LOGIN */}
      <SocialLogin />

      {/* Register Link */}
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <Link href="/register" className="text-red-500 font-semibold underline">
          Register
        </Link>
      </p>
    </form>
  );
}
