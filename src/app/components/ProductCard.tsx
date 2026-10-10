"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const productUrl = `/product/${product.slug}`;

  const handleProductClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPending) {
      event.preventDefault();
      return;
    }

    if (!session?.user) {
      event.preventDefault();

      const callbackURL = encodeURIComponent(productUrl);

      router.push(`/signin?callbackURL=${callbackURL}`);
    }
  };

  return (
    <Link
      href={productUrl}
      onClick={handleProductClick}
      className="block rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="text-5xl" role="img" aria-label={product.nameBn}>
        {product.image || "🛒"}
      </div>

      <h3 className="mt-4 text-xl font-bold text-gray-900">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-gray-500">প্রতি {product.unit}</p>

      <p className="mt-4 text-2xl font-bold text-gray-900">
        ৳{Number(product.today).toLocaleString("bn-BD")}
      </p>

      {product.change.dir !== "flat" && (
        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
            product.change.dir === "up"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {product.change.dir === "up"
            ? `▲ দাম বেড়েছে ${Math.abs(product.change.pct)}%`
            : `▼ দাম কমেছে ${Math.abs(product.change.pct)}%`}
        </span>
      )}

      {product.change.dir === "flat" && (
        <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          ● দাম অপরিবর্তিত
        </span>
      )}
    </Link>
  );
};

export default ProductCard;