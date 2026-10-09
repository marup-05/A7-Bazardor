import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Card } from "@heroui/react";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: IMarket[];
}

const numberBn = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const unitBn = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] || unit;
};

// Product data fetching and details UI
async function ProductContent({ id }: { id: string }) {
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const res = await fetch(
  `https://api.api-store.workers.dev/api/bazardor/products/${encodeURIComponent(id)}`,
  {
    next: { revalidate: 300 },
  }
);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const product: IProduct = await res.json();

  if (!product || typeof product.today !== "number") {
    notFound();
  }

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) =>
            sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      : null;

  const unit = unitBn(product.unit);
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-4 pb-8 pt-4 text-[#26332a]">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="transition hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <span className="text-gray-700">{product.nameBn}</span>
      </nav>

      {/* Product overview */}
      <Card className="rounded-xl border border-[#e2eae2] bg-[#fbfdfb] shadow-sm">
        <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p
                className={`mt-2 text-xs font-medium ${
                  product.today > product.yesterday
                    ? "text-red-600"
                    : product.today < product.yesterday
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.today > product.yesterday
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${numberBn.format(
                      product.today - product.yesterday
                    )} টাকা`
                  : product.today < product.yesterday
                    ? `গতকালের তুলনায় আজ দাম কমেছে · ${numberBn.format(
                        product.yesterday - product.today
                      )} টাকা`
                    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
              </p>
            </div>
          </div>

          <div className="min-w-40 rounded-xl bg-[#f0f5f0] px-4 py-4 sm:text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-3xl font-bold">
              {numberBn.format(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {unit}
            </p>

            <span
              className={`mt-2 inline-block text-xs font-semibold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {numberBn.format(product.change.pct)}%
            </span>
          </div>
        </div>
      </Card>

      {/* Price summary */}
      <section>
        <h2 className="mb-3 text-base font-bold">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryCard
            title="সর্বনিম্ন দাম"
            value={minPrice}
            unit={unit}
            color="green"
          />

          <SummaryCard
            title="সর্বাধিক দাম"
            value={maxPrice}
            unit={unit}
            color="red"
          />

          <SummaryCard
            title="গড় দাম"
            value={averagePrice}
            unit={unit}
            color="green"
          />
        </div>
      </section>

      {/* Market comparison */}
      <Card className="overflow-hidden rounded-xl border border-[#e2eae2] bg-[#fbfdfb] shadow-sm">
        <div className="flex flex-col gap-0 p-0">
          <div className="p-4 sm:p-5">
            <h2 className="text-base font-bold">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse text-sm">
                <thead>
                  <tr className="border-y border-[#e2eae2] bg-[#f4f8f4] text-left text-xs text-gray-600">
                    <th className="px-4 py-3 font-semibold">
                      বাজার
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      বিভাগ
                    </th>

                    <th className="px-4 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-4 py-3 text-right font-semibold">
                      সর্বাধিক
                    </th>

                    <th className="px-4 py-3 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const avg = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-b border-[#dce5dc] last:border-b-0 ${
                          index % 2 === 0
                            ? "bg-[#fbfdfb]"
                            : "bg-[#f0f5f0]"
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          {numberBn.format(market.min)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          {numberBn.format(market.max)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                          {numberBn.format(avg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-5 pb-5 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          )}

          <div className="border-t border-[#e2eae2] px-4 py-3 text-xs text-gray-500">
            গড় দাম বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের
            মধ্যবর্তী মান থেকে হিসাব করা হয়েছে।
          </div>
        </div>
      </Card>

      {/* Back to home */}
      <div className="pb-3 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-[#d5e3d5] bg-white px-5 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-50"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

// Summary card
function SummaryCard({
  title,
  value,
  unit,
  color,
}: {
  title: string;
  value: number | null;
  unit: string;
  color: "green" | "red";
}) {
  return (
    <Card className="rounded-xl border border-[#e4ece4] bg-[#fbfdfb] shadow-sm">
      <div className="p-4">
        <p className="text-xs text-gray-500">{title}</p>

        <p
          className={`mt-2 text-2xl font-bold ${
            color === "red" ? "text-red-600" : "text-green-700"
          }`}
        >
          {value === null ? "—" : numberBn.format(value)}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {value === null ? "তথ্য নেই" : `টাকা / ${unit}`}
        </p>
      </div>
    </Card>
  );
}

// Await params inside the Suspense boundary
async function ProductContentWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductContent id={id} />;
}

// Page
export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-5xl px-4 py-12 text-center text-sm text-gray-500">
          পণ্যের বিস্তারিত লোড হচ্ছে...
        </div>
      }
    >
      <ProductContentWrapper params={params} />
    </Suspense>
  );
}
