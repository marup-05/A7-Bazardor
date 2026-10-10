"use client";

import { useMemo, useState } from "react";
import { Card } from "@heroui/react";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

interface CategoryProductsProps {
  products: IProduct[];
}

type SortOption = "default" | "high-low" | "low-high";

const bengaliNumber = new Intl.NumberFormat("bn-BD");
const formatNumber = (value: number) => bengaliNumber.format(value);

const getUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "টি",
  };

  return units[unit] || unit;
};

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.today - b.today);
    }

    return result;
  }, [products, sort]);

  const firstProduct = products[0];

  if (!firstProduct) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-center text-gray-500 sm:p-6">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-5">
      <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 text-2xl sm:text-3xl">
            {firstProduct.categoryIcon}
          </span>

          <h1 className="min-w-0 break-words text-lg font-bold text-gray-800 sm:text-xl">
            {firstProduct.categoryNameBn}
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {formatNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </section>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          মোট {formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex min-w-0 items-center gap-2">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm text-gray-600"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="high-low">দাম বেশি থেকে কম</option>
            <option value="low-high">দাম কম থেকে বেশি</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Card
              key={product.id}
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex min-w-0 flex-col p-3 sm:p-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xl sm:h-11 sm:w-11 sm:text-2xl">
                    {product.image || product.categoryIcon}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-sm font-semibold leading-6 text-gray-800">
                      {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      প্রতি {getUnit(product.unit)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex min-w-0 items-end justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="mt-1 break-words text-base font-bold leading-7 text-gray-800 sm:text-lg">
                      {formatNumber(product.today)} টাকা
                    </p>
                  </div>

                  <span
                    className={`mb-1 shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {formatNumber(product.change.pct)}%
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
