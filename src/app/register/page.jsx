import Image from "next/image";
import React from "react";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="my-15 min-h-screen flex items-center justify-center bg-white px-5">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* LEFT SIDE IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/assets/images/login/login.svg"
            width={450}
            height={450}
            alt="Register Illustration"
            className="object-contain"
          />
        </div>

        {/* RIGHT SIDE FORM CARD */}
        <div className="border rounded-xl p-10 shadow-sm w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>

          {/* FORM */}
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  );
}
