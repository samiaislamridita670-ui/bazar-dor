
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const today = new Date();

    setBanglaDate(
      today.toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
      })
    );
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav className="border-b border-green-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <img
              src="/logo-icon.png"
              alt="Bazar-Dor Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden text-center md:block">
            <p className="text-sm font-medium text-gray-500">
              আজকের বাজারদর
            </p>
            <p className="mt-1 text-sm font-semibold text-green-700">
              {banglaDate}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg border border-green-600 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 md:px-4"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 md:px-4"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="border-t border-green-50">
          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 md:justify-center">
            <Link href="/" className="whitespace-nowrap font-semibold text-green-700">
              সব পণ্য
            </Link>
            <Link href="/category/chal" className="whitespace-nowrap text-gray-600 transition hover:text-green-700">
              চাল
            </Link>
            <Link href="/category/dal" className="whitespace-nowrap text-gray-600 transition hover:text-green-700">
              ডাল
            </Link>
            <Link href="/category/tel" className="whitespace-nowrap text-gray-600 transition hover:text-green-700">
              তেল
            </Link>
            <Link href="/category/sobji" className="whitespace-nowrap text-gray-600 transition hover:text-green-700">
              সবজি
            </Link>
            <Link href="/category/mach" className="whitespace-nowrap text-gray-600 transition hover:text-green-700">
              মাছ
            </Link>
            <Link href="/category/mangsho" className="whitespace-nowrap text-gray-600 transition hover:text-green-700">
              মাংস
            </Link>
          </div>
        </div>
      </nav>

      <div className="ticker-wrapper">
        <div className="ticker-track">
          <span className="ticker-item text-gray-700">
            📢 আজকের বাজারদর আপডেট
          </span>
          <span className="ticker-item text-green-700">
            🥬 সবজির দাম
          </span>
          <span className="ticker-item text-gray-700">
            🛒 প্রতিদিনের বাজারদর
          </span>
          <span className="ticker-item text-green-700">
            📊 দাম বাড়া ও কমার সর্বশেষ তথ্য
          </span>
          <span className="ticker-item text-gray-700">
            💰 সঠিক বাজারদর, সহজেই জানুন
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
