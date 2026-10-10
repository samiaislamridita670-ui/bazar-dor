"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  // Sign In-এর পর কোথায় ফিরে যেতে হবে
  const requestedURL = searchParams.get("callbackURL");

  const callbackURL =
    requestedURL &&
    requestedURL.startsWith("/") &&
    !requestedURL.startsWith("//")
      ? requestedURL
      : "/";

  // Email এবং Password দিয়ে Sign In
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন।");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.replace(callbackURL);
      router.refresh();
    } catch (error) {
      console.error("Email Sign In Error:", error);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google অথবা GitHub দিয়ে Sign In
  const handleSocialLogin = async (
    provider: "google" | "github",
  ) => {
    try {
      setSocialLoading(provider);

      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL: "/signin",
        disableRedirect: true,
      });

      if (error) {
        console.error(`${provider} Sign In Error:`, error);

        toast.error(
          error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`,
        );

        setSocialLoading("");
        return;
      }

      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      console.error("Social Sign In Response:", data);
      toast.error("লগইন পেজের লিংক পাওয়া যায়নি।");
      setSocialLoading("");
    } catch (error) {
      console.error("Social Sign In Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );

      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-[#f4fbf7] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== ""}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={loading || socialLoading !== ""}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg font-bold">G</span>
          {socialLoading === "google"
            ? "Google দিয়ে সাইন ইন হচ্ছে..."
            : "Google দিয়ে সাইন ইন"}
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          disabled={loading || socialLoading !== ""}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg">⌘</span>
          {socialLoading === "github"
            ? "GitHub দিয়ে সাইন ইন হচ্ছে..."
            : "GitHub দিয়ে সাইন ইন"}
        </button>

        <p className="mt-7 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-[#f4fbf7] px-4 py-12">
          <p className="text-gray-600">সাইন ইন পেজ লোড হচ্ছে...</p>
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}