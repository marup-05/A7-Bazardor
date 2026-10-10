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
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full border-y border-gray-100 bg-white"
    >
      <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
        <div className="flex items-center gap-1.5 overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-xs transition sm:text-sm ${
              pathname === "/"
                ? "bg-green-100 font-semibold text-green-700"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
            }`}
          >
            🏠 হোম
          </Link>

          {categories.map((category) => {
            const isActive =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-xs transition sm:text-sm ${
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
