"use client";
export const dynamic = "force-dynamic"; // important for client hooks like useSearchParams

import Image from "next/image";
import React, { Suspense } from "react";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-5">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* LEFT SIDE IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/assets/images/login/login.svg"
            width={450}
            height={450}
            alt="Login Illustration"
            className="object-contain"
          />
        </div>

        {/* RIGHT SIDE FORM CARD */}
        <div className="border rounded-xl p-10 shadow-sm w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

          {/* LOGIN FORM */}
          {/* FIX: Wrap with Suspense */}
          <Suspense fallback={<p>Loading...</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
