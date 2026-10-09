import { Suspense } from "react";
import MarqueeAnimation from "./MarqueeAnimation"; 

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

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

async function getProducts(): Promise<IProduct[]> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return [];
    }

    const result: unknown = await res.json();

    if (Array.isArray(result)) {
      return result as IProduct[];
    }

    if (
      typeof result === "object" &&
      result !== null &&
      "data" in result &&
      Array.isArray(result.data)
    ) {
      return result.data as IProduct[];
    }

    return [];
  } catch {
    return [];
  }
}

async function MarqueeContent() {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  return <MarqueeAnimation products={products} />;
}

export default function Marquee() {
  return (
    <Suspense
      fallback={
        <div className="bg-green-700 py-2 text-center text-sm text-white">
          বাজার দর লোড হচ্ছে...
        </div>
      }
    >
      <MarqueeContent />
    </Suspense>
  );
}