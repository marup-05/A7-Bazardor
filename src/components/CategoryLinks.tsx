"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryLinksProps {
  categories: ICategory[];
}

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          <Link
            href="/"
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition ${
              pathname === "/"
                ? "bg-green-100 font-semibold text-green-700"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
            }`}
          >
            🏠 হোম
          </Link>

          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-green-100 font-semibold text-green-700"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.nameBn}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CategoryLinks;