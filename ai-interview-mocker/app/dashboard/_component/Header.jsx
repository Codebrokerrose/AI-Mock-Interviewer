"use client";
import React, { use ,useEffect} from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';


export default function Header() {

    const path = usePathname();

    useEffect(() => {
            console.log("Current path:", path);
    }, []);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} alt="Logo" width={70} height={50} />
      <ul className="hidden md:flex gap-6  ">
        {/* hidden initially when scrren size is small */}
        <li
          className={`
            hover:text-primary  hover:font-bold transition-all cursor-pointer
            ${path === "/dashboard" ? "text-primary font-bold" : ""}
            `}
        >
          Dashboard
        </li>
        <li
          className={`
            hover:text-primary  hover:font-bold transition-all cursor-pointer
            ${path === "/dashboard/questions" ? "text-primary font-bold" : ""}
            `}
        >
          Questions
        </li>
        <li
          className={`
            hover:text-primary  hover:font-bold transition-all cursor-pointer
            ${path === "/dashboard/upgrade" ? "text-primary font-bold" : ""}
            `}
        >
          Upgrade
        </li>
        <li
          className={`
            hover:text-primary  hover:font-bold transition-all cursor-pointer
            ${path === "/dashboard/how" ? "text-primary font-bold" : ""}
            `}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}
