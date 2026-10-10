"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const numberBn = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const MarqueeText = dynamic(
  () => import("react-marquee-text"),
  { ssr: false }
);

export default function MarqueeAnimation({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <div className="w-full overflow-hidden border-b border-gray-200 bg-green-700 text-white">
      <div className="mx-auto flex min-w-0 max-w-6xl">
        <div className="shrink-0 bg-green-800 px-3 py-5 text-xs font-bold sm:px-5 sm:text-sm">
          বাজার দর
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            className="py-2 text-xs sm:text-sm"
            direction="right"
            duration={7}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="inline-block whitespace-nowrap px-1 hover:underline sm:px-2"
              >
                <span>
                  {product.image || "🛒"} {product.nameBn} —{" "}
                  {numberBn.format(product.today)} টাকা
                </span>

                <span
                  className={`mx-2 sm:mx-3 ${
                    product.change.dir === "up"
                      ? "text-red-200"
                      : product.change.dir === "down"
                        ? "text-green-200"
                        : "text-white"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {numberBn.format(product.change.pct)}%
                </span>

                <span className="mx-1 sm:mx-3">•</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
}
