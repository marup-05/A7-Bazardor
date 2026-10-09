import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import Marquee from "@/components/Marquee";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      
    <Marquee />

      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <Suspense fallback={null}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
