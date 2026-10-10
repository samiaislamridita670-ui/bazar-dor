import Link from "next/link";
import { getProduct } from "@/lib/api";

export const instant = false;

type Market = {
market: string;
division: string;
min: number;
max: number;
};

type Product = {
id: number;
slug: string;
nameBn?: string;
name?: string;
title?: string;
categoryNameBn?: string;
categoryIcon?: string;
category?: string;
unit?: string;
image?: string;
today?: number;
yesterday?: number;
lastWeek?: number;
lastMonth?: number;
change?: {
dir?: "up" | "down" | "flat";
pct?: number;
};
markets?: Market[];
};

function formatPrice(price: unknown): string {
const value = Number(price);

if (!Number.isFinite(value)) {
return "তথ্য নেই";
}

return value.toLocaleString("bn-BD");
}

export default async function ProductDetailsPage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

let product: Product;

try {
product = (await getProduct(slug)) as Product;
} catch {
return ( <main className="flex min-h-[60vh] items-center justify-center bg-[#f4fbf7] px-4 py-16"> <div className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10"> <div className="text-6xl">🛒</div>

```
      <h1 className="mt-5 text-2xl font-bold text-gray-800 sm:text-3xl">
        পণ্য পাওয়া যায়নি
      </h1>

      <p className="mt-3 leading-7 text-gray-500">
        এই পণ্যের তথ্য বর্তমানে পাওয়া যাচ্ছে না।
        অন্য পণ্য দেখতে হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  </main>
);


}

const productName =
product.nameBn || product.name || product.title || "পণ্যের নাম";

const categoryName = product.categoryNameBn || product.category || "অন্যান্য";

const currentPrice = product.today;

const changeDirection = product.change?.dir || "flat";
const changePercentage = Number(product.change?.pct ?? 0);

const changeText =
changeDirection === "up"
? `▲ দাম বেড়েছে ${formatPrice(Math.abs(changePercentage))}%`
: changeDirection === "down"
? `▼ দাম কমেছে ${formatPrice(Math.abs(changePercentage))}%`
: "— দাম অপরিবর্তিত";

const changeClass =
changeDirection === "up"
? "bg-red-100 text-red-600"
: changeDirection === "down"
? "bg-green-100 text-green-600"
: "bg-gray-100 text-gray-600";

const priceHistory = [
{ label: "গতকাল", price: product.yesterday },
{ label: "গত সপ্তাহ", price: product.lastWeek },
{ label: "গত মাস", price: product.lastMonth },
{ label: "বর্তমান দাম", price: currentPrice },
];

const markets = Array.isArray(product.markets) ? product.markets : [];

return ( <main className="min-h-screen bg-[#f4fbf7] px-4 py-10"> <div className="mx-auto max-w-6xl"> <Link
       href="/"
       className="mb-6 inline-block font-semibold text-green-700 hover:underline"
     >
← সব পণ্যে ফিরে যান </Link>


    <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-[#f4fbf7]">
          <span className="text-[100px] sm:text-[120px]" role="img" aria-label={productName}>
            {product.image || "🛒"}
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold text-green-600">
            {product.categoryIcon || "🛍️"} {categoryName}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {productName}
          </h1>

          <p className="mt-2 text-gray-500">
            প্রতি {product.unit || "একক"}
          </p>

          <div className="mt-6">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-4xl font-bold text-gray-900">
              {currentPrice !== undefined && currentPrice !== null
                ? `৳${formatPrice(currentPrice)}`
                : "দাম পাওয়া যায়নি"}
            </p>
          </div>

          <span
            className={`mt-5 inline-block rounded-full px-4 py-2 text-sm font-semibold ${changeClass}`}
          >
            {changeText}
          </span>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {priceHistory.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-4 ${
                  item.label === "বর্তমান দাম"
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-sm text-gray-500">{item.label}</p>

                <p
                  className={`mt-1 font-bold ${
                    item.label === "বর্তমান দাম"
                      ? "text-green-700"
                      : "text-gray-900"
                  }`}
                >
                  {item.price !== undefined && item.price !== null
                    ? `৳${formatPrice(item.price)}`
                    : "তথ্য নেই"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="mt-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-gray-900">
        বাজারভেদে দাম
      </h2>

      <p className="mt-2 text-gray-500">
        বিভিন্ন বাজারে এই পণ্যের সম্ভাব্য দাম
      </p>

      {markets.length === 0 ? (
        <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center">
          <p className="text-gray-500">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য বর্তমানে পাওয়া যাচ্ছে না।
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {markets.map((market, index) => (
            <div
              key={`${market.market}-${market.division}-${index}`}
              className="rounded-xl border border-gray-100 bg-gray-50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {market.market}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {market.division}
                  </p>
                </div>

                <span className="text-2xl" aria-hidden="true">
                  🏪
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500">সর্বনিম্ন</p>

                  <p className="mt-1 font-bold text-green-700">
                    ৳{formatPrice(market.min)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">সর্বোচ্চ</p>

                  <p className="mt-1 font-bold text-red-600">
                    ৳{formatPrice(market.max)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>

    <p className="mt-6 text-center text-sm leading-6 text-gray-500">
      বাজারদর পরিবর্তনশীল। কেনাকাটার আগে স্থানীয় বাজার থেকে দাম যাচাই করুন।
    </p>
  </div>
</main>


);
}
