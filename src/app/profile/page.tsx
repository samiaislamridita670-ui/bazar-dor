"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      // User is not signed in
    }
  }, [isPending, session]);

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <span className="loading loading-spinner loading-lg text-success" />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-lg">
          <div className="mb-4 text-6xl">🔐</div>

          <h1 className="text-3xl font-bold">
            আমার প্রোফাইল
          </h1>

          <p className="mt-4 text-base-content/70">
            আপনার প্রোফাইল দেখতে প্রথমে অ্যাকাউন্টে সাইন ইন করুন।
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/signin" className="btn btn-primary">
              সাইন ইন
            </Link>

            <Link href="/" className="btn btn-outline">
              হোমপেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
        {/* Profile Avatar */}
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl text-green-700">
          👤
        </div>

        <h1 className="text-center text-3xl font-bold">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-center text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য
        </p>

        {/* User Information */}
        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-sm text-base-content/60">
              আপনার নাম
            </p>

            <p className="mt-1 break-words text-lg font-semibold">
              {user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-sm text-base-content/60">
              ইমেইল ঠিকানা
            </p>

            <p className="mt-1 break-words text-base font-semibold">
              {user.email || "ইমেইল পাওয়া যায়নি"}
            </p>
          </div>

          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-sm text-base-content/60">
              ইমেইল যাচাই
            </p>

            <p className="mt-1 font-semibold">
              {user.emailVerified ? (
                <span className="text-green-600">
                  ✓ যাচাই করা হয়েছে
                </span>
              ) : (
                <span className="text-amber-600">
                  ⚠️ এখনো যাচাই করা হয়নি
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Link
            href="/profile/update"
            className="btn btn-primary w-full"
          >
            ✏️ Update Profile
          </Link>

          <Link
            href="/"
            className="btn btn-outline w-full"
          >
            ← হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}