
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";

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

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;

 const res = await fetch(
  `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
  {
    next: { revalidate: 300 },
  }
);

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const products: IProduct[] = await res.json();

  if (!Array.isArray(products) || products.length === 0) {
    notFound();
  }

  return (
    <CategoryProducts products={products} />
  );
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8">
      <Suspense
        fallback={
          <p className="py-10 text-center text-sm text-gray-500">
            পণ্যের তথ্য লোড হচ্ছে...
          </p>
        }
      >
        <CategoryContent params={props.params} />
      </Suspense>
    </div>
  );
}
