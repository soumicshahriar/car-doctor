"use client";
import { RegisterUser } from "@/app/actions/auth/RegisterUser";
import SocialLogin from "@/app/login/components/SocialLogin";
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // call the auth-action here for register user and send user data
    RegisterUser(data);
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <div className="space-y-2">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          placeholder="Your name"
          {...register("name", { required: "Name is required" })}
          className={`w-full border rounded-md px-4 py-2 outline-none focus:border-red-500 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          placeholder="Your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className={`w-full border rounded-md px-4 py-2 outline-none focus:border-red-500 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="block font-medium">Password</label>
        <input
          type="password"
          placeholder="Your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={`w-full border rounded-md px-4 py-2 outline-none focus:border-red-500 ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="block font-medium">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className={`w-full border rounded-md px-4 py-2 outline-none focus:border-red-500 ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
      >
        Sign Up
      </button>

      {/* SOCIAL LOGIN */}
      <SocialLogin></SocialLogin>

      {/* LOGIN LINK */}
      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-red-500 font-semibold hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}
