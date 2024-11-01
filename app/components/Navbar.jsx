"use client";
import { Menu, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    router.push(`/?search=${query}`);
  };

  return (
    <>
      <nav className="w-full shadow-md px-4 md:px-8 py-3 relative">
        <div className="flex justify-between items-center container mx-auto gap-5">
          <div className="flex items-center space-x-4">
            <Image
              src={"/pinterest.svg"}
              width={50}
              height={50}
              alt="LOGO"
              className="w-9 h-9"
              priority={true}
            />
            <Link
              href="/"
              className="hidden sm:block text-black text-xl transition-all duration-300 hover:text-red-500"
            >
              Home
            </Link>
            <Link
              href="/upload-pin"
              className="hidden sm:block text-black text-xl transition-all duration-300 hover:text-red-500"
            >
              Create Pin
            </Link>
          </div>

          <div className="hidden sm:block w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search
                onClick={handleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-red-500 text-white w-8 h-8 p-1 transition-all duration-300 hover;bg-red-700 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={"AVATAR"}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    priority={true}
                  />
                )}
                <div className="hidden group-hover:block absolute right-0 mt-1 w-48 bg-white shadow-lg border rounded-lg z-10">
                  <button
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="block px-4 py-2 text-red-500 w-full text-start hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <Menu
              className="text-red-500 cursor-pointer block sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              size={40}
            />
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden transition-all duration-300 ease-in-out sm:hidden mt-4`}
        >
          <Link
            href="/"
            className="block py-2 text-black text-xl transition-all duration-300 hover:text-red-500"
          >
            Home
          </Link>
          <Link
            href="/upload-pin"
            className="block text-black text-xl transition-all duration-300 hover:text-red-500"
          >
            Create Pin
          </Link>
          <div className="relative p-2 mt-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-red-500 text-white w-8 h-8 p-1 transition-all duration-300 hover;bg-red-700 cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
