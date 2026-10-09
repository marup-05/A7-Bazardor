import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const products: IProduct[] = await res.json();  

  return (
    <div className="border-b border-gray-200 bg-green-700 text-white">
      <div className="mx-auto flex max-w-6xl">
        <div className="shrink-0 bg-green-800 px-5 py-2 font-bold">
          বাজার দর
        </div>

        <MarqueeText className="py-2" direction="right" duration={7}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="hover:underline"
            >
              <span>
                {product.image} {product.nameBn} — {product.today} টাকা
              </span>

              <span className="mx-3">
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </span>

              <span className="mx-3">•</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;