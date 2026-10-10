"use client";

import { useEffect } from "react";

export default function ErrorPage({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => {
console.error("Application error:", error);
}, [error]);

return ( <main className="flex min-h-[60vh] items-center justify-center bg-[#f8faf9] px-4 py-12"> <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm"> <div className="text-6xl" aria-hidden="true">
⚠️ </div>


    <h1 className="mt-4 text-2xl font-bold text-gray-900">
      দুঃখিত! তথ্য লোড করা যায়নি
    </h1>

    <p className="mt-3 leading-7 text-gray-600">
      বাজারদরের তথ্য আনতে সমস্যা হয়েছে। আপনার ইন্টারনেট সংযোগ পরীক্ষা করে
      আবার চেষ্টা করুন।
    </p>

    <button
      onClick={() => reset()}
      className="mt-6 rounded-xl bg-[#0fa958] px-6 py-3 font-semibold text-white transition hover:bg-[#0b8d49] focus:outline-none focus:ring-2 focus:ring-[#0fa958] focus:ring-offset-2"
    >
      আবার চেষ্টা করুন
    </button>
  </div>
</main>


);
}
