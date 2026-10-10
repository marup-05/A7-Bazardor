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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
          >
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={42}
              height={42}
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              priority
            />

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-gray-800 sm:text-xl">
                বাজার দর
              </h1>

              <p className="max-w-[190px] truncate text-[10px] text-gray-500 sm:max-w-none sm:text-xs">
                {date}
              </p>
            </div>
          </Link>

          <div className="shrink-0">
            <AuthMenu />
          </div>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
