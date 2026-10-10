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

function CategorySkeleton() {
  return (
    <div className="animate-pulse space-y-6 py-6">
      <div className="h-8 w-56 rounded bg-gray-200" />

      <div className="h-4 w-40 rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="h-36 rounded-lg bg-gray-200" />
            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-5 w-1/2 rounded bg-gray-200" />
            <div className="mt-4 h-8 rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
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

  return <CategoryProducts products={products} />;
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={props.params} />
      </Suspense>
    </div>
  );
}