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
    <div className="border-b border-gray-200 bg-green-700 text-white">
      <div className="mx-auto flex max-w-6xl">
        <div className="shrink-0 bg-green-800 px-5 py-2 font-bold">
          বাজার দর
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            className="py-2"
            direction="right"
            duration={7}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="whitespace-nowrap hover:underline"
              >
                <span>
                  {product.image} {product.nameBn} —{" "}
                  {numberBn.format(product.today)} টাকা
                </span>

                <span
                  className={`mx-3 ${
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

                <span className="mx-3">•</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
}
