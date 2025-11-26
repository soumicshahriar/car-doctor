"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  // get the login user data
  const { data: session, status } = useSession();
  // console.log(session, status);

  const navLink = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/about"}>About</Link>
      </li>
      <li>
        <Link href={"/my-bookings"}>My Bookings</Link>
      </li>

      {/* i am keeping this hide for future update with user role based  */}
      <li className="hidden">
        <Link href={"/add-service"}>ADD Service</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full  z-50 h-20 flex items-center px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLink}
          </ul>
        </div>
        <div>
          <Link href={"/"} className="btn btn-ghost text-xl">
            {" "}
            <Image
              src={"/assets/logo.svg"}
              width={50}
              height={50}
              alt="LogoImage"
            />{" "}
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLink}</ul>
      </div>
      <div className="navbar-end ">
        {status === "authenticated" ? (
          <>
            <Image
              src={
                session?.user?.image ||
                "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              }
              width={24}
              height={24}
              alt="userImage"
              className="w-8 rounded-full"
              title={session?.user?.email}
            ></Image>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="btn btn-outline mx-2"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link href={"/login"}>
            <button className="btn btn-outline mr-2">Login</button>
          </Link>
        )}

        <a className="btn btn-outline text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white">
          Appointment
        </a>
      </div>
    </div>
  );
}
