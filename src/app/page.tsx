
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.abcz.workers.dev/api/bazardor"
).replace(/\/+$/, "");

type Product = {
  id?: string | number;
  slug?: string;
  nameBn?: string;
  name?: string;
  image?: string;
  today?: number | string;
  yesterday?: number | string;
  change?: number | string;
  unit?: string;
  category?: string;
};

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫗" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
];

function formatPrice(price: number | string | undefined) {
  if (price === undefined || price === null || price === "") {
    return "দাম পাওয়া যায়নি";
  }

  const value = Number(price);

  if (!Number.isFinite(value)) {
    return "দাম পাওয়া যায়নি";
  }

  return `${value.toLocaleString("bn-BD")} টাকা`;
}

function getChange(product: Product) {
  if (
    product.change !== undefined &&
    product.change !== null &&
    product.change !== ""
  ) {
    const change = Number(product.change);

    if (Number.isFinite(change)) {
      return change;
    }
  }

  const today = Number(product.today);
  const yesterday = Number(product.yesterday);

  if (
    product.today !== undefined &&
    product.yesterday !== undefined &&
    Number.isFinite(today) &&
    Number.isFinite(yesterday)
  ) {
    return today - yesterday;
  }

  return 0;
}

function getProductName(product: Product) {
  return product.nameBn || product.name || "পণ্যের নাম";
}

function getProductLink(product: Product) {
  const identifier = product.slug ?? product.id;

  if (identifier === undefined || identifier === null || identifier === "") {
    return "#all-products";
  }

  return `/product/${encodeURIComponent(String(identifier))}`;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(
      new Date().getFullYear().toLocaleString("bn-BD")
    );
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`${API_URL}/products`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি");
      }

      const result = await response.json();

      const productList = Array.isArray(result)
        ? result
        : Array.isArray(result.products)
          ? result.products
          : Array.isArray(result.data)
            ? result.data
            : [];

      setProducts(productList);
    } catch (err) {
      console.error("Products loading error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  const priceUp = [...products]
    .filter((product) => getChange(product) > 0)
    .sort((a, b) => getChange(b) - getChange(a))
    .slice(0, 6);

  const priceDown = [...products]
    .filter((product) => getChange(product) < 0)
    .sort((a, b) => getChange(a) - getChange(b))
    .slice(0, 6);

  const displayedProducts = products.slice(0, 10);

  return (
    <main className="min-h-screen bg-[#f7faf7] text-gray-800">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-emerald-100 p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:p-12">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/logo-icon.png"
                alt="আজকের বাজারদর লোগো"
                width={64}
                height={64}
                priority
                className="h-14 w-14 rounded-2xl object-contain sm:h-16 sm:w-16"
              />

              <div>
                <p className="text-sm font-semibold text-green-700">
                  প্রতিদিনের বাজারের সঙ্গী
                </p>

                <p className="text-lg font-bold text-gray-900">
                  আজকের বাজারদর
                </p>
              </div>
            </div>

            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              🛒 বাজার করুন জেনে-বুঝে
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              প্রতিদিনের বাজারদর,
              <span className="mt-2 block text-green-700">
                এখন আপনার হাতেই!
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ ও মাংসের বাজারদর এক জায়গায় দেখুন।
              কোন পণ্যের দাম বেড়েছে, কোনটির দাম কমেছে—জেনে নিন সহজেই।
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#all-products"
                className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-md transition hover:bg-green-800"
              >
                সব পণ্যের দাম দেখুন →
              </a>

              <Link
                href="/category/chal"
                className="rounded-xl border border-green-200 bg-white px-6 py-3 font-bold text-green-800 transition hover:bg-green-50"
              >
                ক্যাটাগরি দেখুন
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
              <span>✓ সহজে দাম দেখুন</span>
              <span>✓ পণ্যের তুলনা করুন</span>
              <span>✓ সচেতনভাবে বাজার করুন</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের বিভিন্ন পণ্য"
              width={700}
              height={550}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-green-700">
            পণ্য খুঁজুন
          </p>

          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            বাজারের ক্যাটাগরি
          </h2>

          <p className="mt-2 text-gray-600">
            আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি বেছে নিন।
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <span className="flex h-14 items-center justify-center text-4xl">
                {category.icon}
              </span>

              <h3 className="mt-3 font-bold text-gray-800 transition group-hover:text-green-700">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                দাম দেখুন →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Price Up Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-red-600">
              ▲ দাম বৃদ্ধি
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              যেসব পণ্যের দাম বেড়েছে
            </h2>
          </div>

          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
            মূল্যবৃদ্ধির তালিকা
          </span>
        </div>

        {loading ? (
          <LoadingCards />
        ) : error ? (
          <ErrorMessage onRetry={loadProducts} />
        ) : priceUp.length === 0 ? (
          <EmptyMessage message="এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceUp.map((product, index) => (
              <ProductCard
                key={product.id ?? product.slug ?? index}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Price Down Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-green-700">
              ▼ দাম হ্রাস
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              যেসব পণ্যের দাম কমেছে
            </h2>
          </div>

          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            মূল্যহ্রাসের তালিকা
          </span>
        </div>

        {loading ? (
          <LoadingCards />
        ) : error ? (
          <ErrorMessage onRetry={loadProducts} />
        ) : priceDown.length === 0 ? (
          <EmptyMessage message="এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceDown.map((product, index) => (
              <ProductCard
                key={product.id ?? product.slug ?? index}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* All Products Section */}
      <section
        id="all-products"
        className="scroll-mt-8 bg-white py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-green-700">
                বাজারের সম্পূর্ণ তালিকা
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                সব পণ্যের বাজারদর
              </h2>

              <p className="mt-2 text-gray-600">
                প্রতিদিনের প্রয়োজনীয় পণ্যের দাম এক জায়গায়।
              </p>
            </div>

            <span className="rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
              মোট পণ্য: {products.length.toLocaleString("bn-BD")}
            </span>
          </div>

          {loading ? (
            <LoadingCards />
          ) : error ? (
            <ErrorMessage onRetry={loadProducts} />
          ) : displayedProducts.length === 0 ? (
            <EmptyMessage message="এখনো কোনো পণ্যের তথ্য পাওয়া যায়নি।" />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id ?? product.slug ?? index}
                    product={product}
                  />
                ))}
              </div>

              {products.length > 10 && (
                <p className="mt-6 text-center text-sm text-gray-500">
                  মোট {products.length.toLocaleString("bn-BD")}টি পণ্যের মধ্যে
                  প্রথম ১০টি দেখানো হচ্ছে।
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-green-800 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <div className="mb-4 flex justify-center">
            <Image
              src="/logo-icon.png"
              alt="আজকের বাজারদর"
              width={60}
              height={60}
              className="h-14 w-14 rounded-xl bg-white object-contain p-1"
            />
          </div>

          <h2 className="text-2xl font-extrabold sm:text-3xl">
            বাজারে যাওয়ার আগে দাম জেনে নিন
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-green-100">
            সঠিক তথ্য দেখুন, পণ্যের দাম তুলনা করুন এবং পরিকল্পনা করে বাজার করুন।
          </p>

          <a
            href="#all-products"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition hover:bg-green-50"
          >
            বাজারদর দেখুন →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-7 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="আজকের বাজারদর লোগো"
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg object-contain"
            />

            <div>
              <p className="font-extrabold text-gray-900">
                আজকের বাজারদর
              </p>

              <p className="text-sm text-gray-500">
                প্রতিদিনের বাজারের তথ্য
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            © {currentYear} আজকের বাজারদর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const change = getChange(product);
  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <Link
      href={getProductLink(product)}
      aria-label={`${getProductName(product)}-এর বিস্তারিত দেখুন`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
    >
      <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:border-green-200 group-hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl">
            {product.image || "🛒"}
          </div>

          {isUp ? (
            <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
              ▲ দাম বেড়েছে
            </span>
          ) : isDown ? (
            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
              ▼ দাম কমেছে
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
              ● দাম অপরিবর্তিত
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-extrabold text-gray-900 group-hover:text-green-800">
          {getProductName(product)}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          একক: {product.unit || "প্রযোজ্য একক"}
        </p>

        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-2xl font-extrabold text-green-800">
            {formatPrice(product.today)}
          </p>

          {product.yesterday !== undefined && (
            <p className="mt-2 text-sm text-gray-500">
              গতকালের দাম: {formatPrice(product.yesterday)}
            </p>
          )}

          {(isUp || isDown) && (
            <p
              className={`mt-2 text-sm font-bold ${
                isUp ? "text-red-600" : "text-green-700"
              }`}
            >
              {isUp ? "▲" : "▼"}{" "}
              {Math.abs(change).toLocaleString("bn-BD")} টাকা পরিবর্তন
            </p>
          )}
        </div>

        {/* <p className="mt-4 text-sm font-semibold text-green-700 group-hover:text-green-900">
          বিস্তারিত জানতে কার্ডে ক্লিক করুন →
        </p> */}
      </article>
    </Link>
  );
}

function LoadingCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5"
        >
          <div className="h-12 w-12 rounded-xl bg-gray-200" />
          <div className="mt-5 h-5 w-2/3 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />
          <div className="mt-5 h-24 rounded-xl bg-gray-100" />
          <div className="mt-4 h-10 rounded-xl bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function EmptyMessage({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
      <div className="text-4xl">🛒</div>
      <p className="mt-3 font-semibold text-gray-700">{message}</p>
    </div>
  );
}

function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-white px-5 py-10 text-center">
      <div className="text-4xl">⚠️</div>

      <h3 className="mt-3 text-lg font-bold text-gray-900">
        বাজারদরের তথ্য লোড করা যায়নি
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
      </p>

      <button
        onClick={onRetry}
        className="mt-5 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
