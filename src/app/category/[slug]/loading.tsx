export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f4fbf7] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Back Button Skeleton */}
        <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />

        {/* Header Skeleton */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-10 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />

          <div className="mt-5 h-5 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Product Skeleton Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-200" />

              <div className="mt-4 h-6 w-40 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 h-8 w-28 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-7 w-32 animate-pulse rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}