"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  const handleUpdateProfile = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!session?.user) {
      router.push("/signin");
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);
    setMessage("");
    setErrorMessage("");

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        setErrorMessage(
          error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      setMessage("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      await authClient.getSession();

      router.refresh();

      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (error) {
      console.error("Profile update failed:", error);

      setErrorMessage(
        "প্রোফাইল আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsUpdating(false);
    }
  };

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

          <h1 className="text-2xl font-bold">
            সাইন ইন প্রয়োজন
          </h1>

          <p className="mt-4 text-base-content/70">
            প্রোফাইল আপডেট করতে প্রথমে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/signin" className="btn btn-primary">
              সাইন ইন
            </Link>

            <Link href="/profile" className="btn btn-outline">
              প্রোফাইলে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
        <div className="mb-4 text-center text-5xl">✏️</div>

        <h1 className="text-center text-3xl font-bold">
          প্রোফাইল আপডেট
        </h1>

        <p className="mt-3 text-center text-base-content/70">
          আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
        </p>

        <form onSubmit={handleUpdateProfile} className="mt-8 space-y-5">
          {/* User Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              autoComplete="name"
              required
              maxLength={100}
              className="input input-bordered w-full"
            />
          </div>

          {/* Email - Read Only */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              ইমেইল ঠিকানা
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={session.user.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />

            <p className="mt-2 text-xs text-base-content/60">
              এই পেজ থেকে ইমেইল পরিবর্তন করা যাবে না।
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
            >
              {message}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          {/* Update Button */}
          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary w-full"
          >
            {isUpdating ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                আপডেট হচ্ছে...
              </>
            ) : (
              "💾 প্রোফাইল আপডেট করুন"
            )}
          </button>

          {/* Back Button */}
          <Link href="/profile" className="btn btn-outline w-full">
            ← প্রোফাইলে ফিরে যান
          </Link>
        </form>
      </div>
    </main>
  );
}