import ProductCard from "./ProductCard";

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

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const HomeProducts = async () => {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return (
      <p className="mt-8 px-3 text-center text-sm text-red-600 sm:mt-12 sm:text-base">
        পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
      </p>
    );
  }

  const data: unknown = await res.json();

  const products: IProduct[] = Array.isArray(data)
    ? data
    : typeof data === "object" &&
        data !== null &&
        "data" in data &&
        Array.isArray(data.data)
      ? data.data
      : [];

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="mt-8 w-full min-w-0 space-y-10 sm:mt-12 sm:space-y-12">
      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            ▲ আজ দাম বেড়েছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            ▼ আজ দাম কমেছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {fallingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-36">
        <div className="mb-4 sm:mb-5">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeProducts;
