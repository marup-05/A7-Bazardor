import CategoryLinks from "./CategoryLinks";

interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/categories";

async function getCategories(): Promise<ICategory[]> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return [];
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data as ICategory[];
  } catch {
    return [];
  }
}

export default async function NavLinks() {
  const categories = await getCategories();

  return <CategoryLinks categories={categories} />;
}
