import Link from "next/link";
import ProductSort from "@/app/components/ProductSort";
import { getProducts } from "@/lib/api";

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  sobji: "সবজি",
  mach: "মাছ",
  mangsho: "মাংস",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getProducts();

  const categoryProducts = products.filter(
    (product: any) => product.category === slug
  );

  const categoryName =
    categoryProducts[0]?.categoryNameBn ||
    categoryNames[slug] ||
    "পণ্য";

  return (
    <main className="min-h-screen bg-[#f4fbf7] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-block font-semibold text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Category Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold text-green-600">
            🛒 ক্যাটাগরি
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {categoryName}
          </h1>

          <p className="mt-2 text-gray-500">
            এই ক্যাটাগরির বর্তমান বাজারদর দেখুন
          </p>

          <p className="mt-4 font-semibold text-gray-700">
            মোট {categoryProducts.length}টি পণ্য
          </p>
        </div>

        {/* Products */}
        {categoryProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">😔</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <ProductSort products={categoryProducts} />
        )}
      </div>
    </main>
  );
}