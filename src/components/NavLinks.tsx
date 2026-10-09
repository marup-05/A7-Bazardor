import CategoryLinks from "./CategoryLinks";

interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const categories: ICategory[] = await res.json();

  return <CategoryLinks categories={categories} />;
};

export default NavLinks;