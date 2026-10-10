import Link from "next/link";
import { Card } from "@heroui/react";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

interface ProductCardProps {
  product: IProduct;
}

const numberBn = new Intl.NumberFormat("bn-BD");

const unitBn = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] || unit;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
    >
      <Card className="h-full w-full min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="min-w-0 p-3 sm:p-4">
          <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xl sm:h-11 sm:w-11 sm:text-2xl">
                {product.image || "🛒"}
              </span>

              <div className="min-w-0">
                <h3 className="break-words text-sm font-semibold leading-5 text-gray-800 sm:leading-6">
                  {product.nameBn}
                </h3>

                <p className="mt-1 break-words text-[11px] leading-4 text-gray-500 sm:text-xs">
                  {product.categoryNameBn} · প্রতি {unitBn(product.unit)}
                </p>
              </div>
            </div>

            <span
              className={`shrink-0 rounded-md px-1.5 py-1 text-[10px] font-semibold sm:px-2 sm:text-xs ${
                isUp
                  ? "bg-red-50 text-red-600"
                  : isDown
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {numberBn.format(product.change.pct)}%
            </span>
          </div>

          <div className="mt-3 sm:mt-4">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 break-words text-base font-bold leading-6 text-gray-800 sm:text-lg">
              {numberBn.format(product.today)} টাকা
              <span className="ml-1 text-xs font-normal text-gray-500">
                / {unitBn(product.unit)}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
