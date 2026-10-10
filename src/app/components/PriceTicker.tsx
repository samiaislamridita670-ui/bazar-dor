
"use client";

interface Product {
  id: string | number;
  name?: string;
  nameBn?: string;
  title?: string;
  emoji?: string;
  image?: string;
  price?: number | string;
  today?: number | string;
  yesterday?: number | string;
  currentPrice?: number | string;
  todayPrice?: number | string;
  unit?: string;
  change?: {
    dir?: string;
    pct?: number | string;
  };
  [key: string]: unknown;
}

interface PriceTickerProps {
  products: Product[];
}

const formatBanglaNumber = (value: number) => {
  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
};

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return NaN;
}

function getPrice(product: Product): number {
  const possiblePrices = [
    product.price,
    product.today,
    product.currentPrice,
    product.todayPrice,
    product["current_price"],
    product["today_price"],
    product["minPrice"],
    product["min_price"],
  ];

  for (const value of possiblePrices) {
    const price = toNumber(value);

    if (Number.isFinite(price)) {
      return price;
    }
  }

  return NaN;
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products?.length) return null;

  const tickerProducts = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-y border-gray-100 bg-white py-3">
      <div className="flex w-max animate-price-scroll hover:[animation-play-state:paused]">
        {tickerProducts.map((product, index) => {
          const direction = product.change?.dir;
          const percentage = toNumber(product.change?.pct ?? 0);
          const price = getPrice(product);

          const name =
            typeof product.nameBn === "string"
              ? product.nameBn
              : typeof product.name === "string"
                ? product.name
                : typeof product.title === "string"
                  ? product.title
                  : "পণ্য";

          const unit =
            typeof product.unit === "string" ? product.unit : "একক";

          const emoji =
            typeof product.emoji === "string"
              ? product.emoji
              : typeof product.image === "string"
                ? product.image
                : "🛒";

          return (
            <div
              key={`${product.id}-${index}`}
              className="mx-5 flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
            >
              <span className="text-xl">{emoji}</span>

              <span className="font-medium text-gray-700">{name}</span>

              <span className="font-bold text-gray-900">
                {Number.isFinite(price)
                  ? `${formatBanglaNumber(price)} টাকা/${unit}`
                  : "দাম পাওয়া যায়নি"}
              </span>

              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  direction === "up"
                    ? "bg-rose-50 text-[#e11d48]"
                    : direction === "down"
                      ? "bg-green-50 text-[#16a34a]"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "—"}{" "}
                {formatBanglaNumber(
                  Number.isFinite(percentage)
                    ? Math.abs(percentage)
                    : 0
                )}
                %
              </span>

              <span className="ml-3 h-5 border-r border-gray-200" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
