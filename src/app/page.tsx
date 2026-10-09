import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <Suspense fallback={null}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
