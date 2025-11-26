"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

export default function SocialLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSocialLogin = async (provider) => {
    toast.loading(`Redirecting to ${provider}...`);
    await signIn(provider, { callbackUrl });
  };

  return (
    <div>
      <div className="text-center mt-6 text-gray-500">Or Sign In with</div>
      <div className="flex justify-center gap-5 mt-4">
        <button
          onClick={() => handleSocialLogin("facebook")}
          className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:bg-blue-600 transition"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={() => handleSocialLogin("linkedin")}
          className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
        >
          <FaLinkedinIn />
        </button>
        <button
          onClick={() => handleSocialLogin("google")}
          className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:bg-red-500 transition"
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
}
