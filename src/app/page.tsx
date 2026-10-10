import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import Marquee from "@/components/Marquee";

function HeroSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl animate-pulse px-4 py-6">
      <div className="h-48 rounded-2xl bg-gray-200 sm:h-64" />
    </section>
  );
}

function ProductSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-200 p-4"
          >
            <div className="h-36 rounded-lg bg-gray-200" />
            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-5 w-1/2 rounded bg-gray-200" />
            <div className="mt-4 h-8 rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Marquee />

      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<ProductSkeleton />}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
