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

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const unit =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "liter"
        ? "লিটার"
        : product.unit === "dozen"
          ? "ডজন"
          : product.unit;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-2xl">
            {product.image}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {product.nameBn}
            </h3>

            <p className="text-xs text-gray-500">
              {product.categoryNameBn} · প্রতি {unit}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${  
            product.change.dir === "up"
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">আজকের দাম</p>

        <p className="mt-1 text-lg font-bold text-gray-800">
          {product.today} টাকা
          <span className="ml-1 text-xs font-normal text-gray-500">
            / {unit}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;