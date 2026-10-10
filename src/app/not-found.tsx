import Link from "next/link";

export default function NotFound() {
return ( <main className="flex min-h-[70vh] flex-col items-center justify-center bg-base-100 px-4 text-center"> <p className="text-8xl font-extrabold text-error">404</p>


  <h1 className="mt-4 text-2xl font-bold text-base-content sm:text-3xl">
    দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
  </h1>

  <p className="mt-3 max-w-md text-base-content/70">
    আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, ঠিকানা পরিবর্তন হয়েছে অথবা
    পেজটি বর্তমানে পাওয়া যাচ্ছে না।
  </p>

  <Link
    href="/"
    className="btn btn-error mt-6 text-white"
  >
    হোমপেজে ফিরে যান
  </Link>
</main>


);
}
