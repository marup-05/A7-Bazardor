
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";
import AuthMenu from "./AuthMenu";

const Header = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={42}
              height={42}
              className="h-10 w-10"
              priority
            />

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                বাজার দর
              </h1>

              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </Link>

          <AuthMenu />
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
