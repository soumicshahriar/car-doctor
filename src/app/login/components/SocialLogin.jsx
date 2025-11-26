"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

export default function SocialLogin() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSocialLogin = async (provider) => {
    toast.loading(
      "Redirecting to " +
        provider.charAt(0).toUpperCase() +
        provider.slice(1) +
        "..."
    );
    await signIn(provider, {
      callbackUrl, // redirect after successful login
    });
  };

  return (
    <div>
      <div className="text-center mt-6 text-gray-500">Or Sign Up with</div>
      <div className="flex justify-center gap-5 mt-4">
        <div
          onClick={() => handleSocialLogin("facebook")}
          className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:bg-blue-600  transition"
        >
          <FaFacebookF />
        </div>
        <div
          onClick={() => handleSocialLogin("linkedin")}
          className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:bg-blue-700  transition"
        >
          <FaLinkedinIn />
        </div>
        <div
          onClick={() => handleSocialLogin("google")}
          className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:bg-red-500  transition"
        >
          <FaGoogle />
        </div>
      </div>
    </div>
  );
}
