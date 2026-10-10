"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [banglaDate, setBanglaDate] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const today = new Date();

    setBanglaDate(
      today.toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
      })
    );
  }, []);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out failed:", error.message);
        return;
      }

      setIsProfileOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="border-b border-green-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <img
              src="/logo-icon.png"
              alt="Bazar-Dor Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Bengali Date */}
          <div className="hidden text-center md:block">
            <p className="text-sm font-medium text-gray-500">
              আজকের বাজারদর
            </p>

            <p className="mt-1 text-sm font-semibold text-green-700">
              {banglaDate}
            </p>
          </div>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {isPending ? (
              <div
                className="h-10 w-24 animate-pulse rounded-lg bg-gray-100"
                aria-label="Loading account"
              />
            ) : session?.user ? (
              <div className="relative">
                {/* Profile Button */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((previous) => !previous)}
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 rounded-lg border border-green-600 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 md:px-4"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
                    {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>

                  <span>Profile</span>

                  <span aria-hidden="true">
                    {isProfileOpen ? "▲" : "▼"}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    <div className="border-b border-gray-100 px-3 py-3">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {session.user.name || "User"}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      👤 View Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSigningOut ? "Signing Out..." : "↪ Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-green-50">
          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 md:justify-center">
            <Link
              href="/"
              className="whitespace-nowrap font-semibold text-green-700"
            >
              সব পণ্য
            </Link>

            <Link
              href="/category/chal"
              className="whitespace-nowrap text-gray-600 transition hover:text-green-700"
            >
              চাল
            </Link>

            <Link
              href="/category/dal"
              className="whitespace-nowrap text-gray-600 transition hover:text-green-700"
            >
              ডাল
            </Link>

            <Link
              href="/category/tel"
              className="whitespace-nowrap text-gray-600 transition hover:text-green-700"
            >
              তেল
            </Link>

            <Link
              href="/category/sobji"
              className="whitespace-nowrap text-gray-600 transition hover:text-green-700"
            >
              সবজি
            </Link>

            <Link
              href="/category/mach"
              className="whitespace-nowrap text-gray-600 transition hover:text-green-700"
            >
              মাছ
            </Link>

            <Link
              href="/category/mangsho"
              className="whitespace-nowrap text-gray-600 transition hover:text-green-700"
            >
              মাংস
            </Link>
          </div>
        </div>
      </nav>

      {/* Market Ticker */}
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