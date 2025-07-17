"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";

const Navbar = () => {
  const router = useRouter();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);
    router.push(`/search?${urlParams.toString()}`);
  };

  return (
    <nav className="px-6 md:px-12 py-4 fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-gray-900">
          Watch Web
        </Link>
        <div className="relative flex-1 max-w-xs mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            className="h-10 pl-10 pr-4 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
        </div>
        <Link href="/add-product">
          <button className="px-5 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
            Add Product
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;