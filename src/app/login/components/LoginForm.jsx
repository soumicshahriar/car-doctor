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

  // for redirect to the visiting page
  const searchparams = useSearchParams();
  const callbackUrl = searchparams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    // submitting toast
    toast("submitting");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
    console.log("SIGNIN RESULT:", result);

    if (result?.error) {
      toast.error("Login Failed Please provide correct email and password");
      // console.log("Login failed:", result.error);
      return; //prevent redirect
    }

    toast.success("Login Successful");
    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label>Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          className="border w-full px-4 py-2"
        />
      </div>

      {/* Password */}
      <div>
        <label>Password</label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="border w-full px-4 py-2"
        />
      </div>

      {/* Submit */}
      <button className="w-full bg-red-500 text-white py-2 rounded-md">
        Log In
      </button>

      {/* SOCIAL LOGIN */}
      <SocialLogin></SocialLogin>

      {/* Register Link */}
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <Link href="/register" className="text-red-500 font-semibold underline">
          Register
        </Link>
      </p>

      {/*  */}
    </form>
  );
}
