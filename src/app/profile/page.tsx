import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl">👤</div>

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