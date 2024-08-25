"use client";
import React, { useState } from "react";
import Navlink from "./Navlink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link";

const navLinks = [
  {
    title: "Students",
    path: "#",
  },
  {
    title: "Mentors",
    path: "#",
  },
  {
    title: "Contact Us",
    path: "#",
  },
];

const Avatar_img = {
    user_image: "https://github.com/shadcn.png",
    user_name: "kunal passan",
    user_mailid: "kp728@snu.edu.in",
    user_initials: "KP"
}

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border-b-2 border-[#E4E7EC] top-0 left-0 right-0 z-10 bg-white">
      <div className="flex container lg:py-4 lg:px-16 flex-wrap items-center mx-auto px-6 py-2 justify-between">
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-900 text-slate-900 hover:text-[#A9A9A9] hover:border-[#A9A9A9]"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-900 text-slate-900 hover:text-[#A9A9A9] hover:border-[#A9A9A9]"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div>
          <ul>
            <Link href="/">
            <h1 className="text-[#ebb21d] font-semibold">
              Cere<span className="font-bold">BRO</span>
            </h1>
            </Link>
          </ul>
        </div>
        <div className="menu hidden md:block gap-4">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 gap-2">
            {navLinks.map((link, index) => (
              <li className="font-sans" key={index}>
                <Navlink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
          </div>
          <div className="flex gap-6 items-center">
          <div className="flex">
            <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <p className="ml-2 text-[#344054]">Streak</p>
            </Button>
        </div>
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        </div>
        {/* instead of using shadcn element here we can easily use firebase login system which can have the login image of the google account used to login as well as the name and emailid of the person */}
        <div className="flex gap-2">
        <div className="flex ">
        <Avatar>
            <AvatarImage className="cursor-pointer" src={Avatar_img.user_image} />
            <AvatarFallback>{Avatar_img.user_initials}</AvatarFallback>
        </Avatar>
        </div>
        <div className="flex-col">
            <p className="text-sm cursor-default text-[#344054] font-semibold">{Avatar_img.user_name}</p>
            <p className="text-sm cursor-default text-[#475467] font-normal">{Avatar_img.user_mailid}</p>
        </div>
        </div>
        </div>
      </div>
        
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;