"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log("Current path:", path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-purple-100 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="PREPTIK Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold text-purple-700 tracking-wide">
          PREPTIK
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link
            href="/dashboard"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === "/dashboard" ? "text-primary font-bold" : ""
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/how-it-works"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === "/how-it-works" ? "text-primary font-bold" : ""
            }`}
          >
            How it Works?
          </Link>
        </li>
      </ul>

      {/* User Profile */}
      <UserButton />
    </div>
  );
}
