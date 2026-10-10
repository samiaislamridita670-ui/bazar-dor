
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") || "");

    if (!name || !email || !password) {
      toast.error("সবগুলো তথ্য পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    try {
      setLoading(true);

      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        console.error("Signup API error:", result.error);

        toast.error(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      form.reset();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error instanceof Error
          ? `Signup ব্যর্থ: ${error.message}`
          : "সার্ভারের সঙ্গে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    try {
      setSocialLoading(provider);

      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        console.error(`${provider} login error:`, result.error);

        toast.error(
          result.error.message ||
            `${provider} দিয়ে সাইন ইন করা যায়নি।`
        );

        setSocialLoading("");
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);

      toast.error(`${provider} দিয়ে সাইন ইন করা যায়নি।`);
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-[#f4fbf7] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বাজার দর-এ আপনার নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নাম লিখুন"
              autoComplete="name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

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
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
              autoComplete="new-password"
              minLength={8}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== ""}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "অ্যাকাউন্ট তৈরি করুন"}
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
          <span className="text-lg">G</span>

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
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
