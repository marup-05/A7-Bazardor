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
    dir: "up" | "down";
    pct: number;
  };
}

const HomeProducts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const products: IProduct[] = await res.json();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="mt-12 space-y-12">
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            ▲ আজ দাম বেড়েছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            ▼ আজ দাম কমেছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">সব পণ্য</h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট ৩৩টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeProducts;