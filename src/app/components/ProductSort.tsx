"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
id: number;
slug: string;
nameBn: string;
unit: string;
today: number;
image: string;
change: {
dir: "up" | "down" | "flat";
pct: number;
};
};

type ProductSortProps = {
products: Product[];
};

export default function ProductSort({ products }: ProductSortProps) {
const [sortType, setSortType] = useState<"default" | "low" | "high">(
"default"
);

const sortedProducts = [...products].sort((a, b): number => {
if (sortType === "low") {
return a.today - b.today;
}


if (sortType === "high") {
  return b.today - a.today;
}

return 0;


});

return ( <section> <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"> <p className="text-sm text-gray-600">
মোট{" "} <span className="font-bold text-green-700">{products.length}</span>{" "}
টি পণ্য </p>


    <label className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">
        দাম অনুযায়ী সাজান:
      </span>

      <select
        value={sortType}
        onChange={(event) =>
          setSortType(event.target.value as "default" | "low" | "high")
        }
        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
        aria-label="পণ্যের দাম অনুযায়ী সাজান"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">কম দাম থেকে বেশি</option>
        <option value="high">বেশি দাম থেকে কম</option>
      </select>
    </label>
  </div>

  {sortedProducts.length === 0 ? (
    <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
      <div className="text-5xl" aria-hidden="true">
        🛒
      </div>

      <h2 className="mt-4 text-xl font-bold text-gray-800">
        কোনো পণ্য পাওয়া যায়নি
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )}
</section>


);
}
