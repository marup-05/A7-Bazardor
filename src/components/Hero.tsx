import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

const Hero = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="grid w-full min-w-0 grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl bg-green-50 px-4 py-7 sm:gap-8 sm:px-6 sm:py-9 md:grid-cols-2 md:px-10 md:py-10">
      <div className="min-w-0">
        <p className="mb-3 inline-block max-w-full rounded-full bg-gray-200 px-3 py-2 text-xs font-semibold text-green-700 sm:px-4 sm:text-sm">
          {date}
        </p>

        <h1 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
          আজকের বাজারের দাম
          <br />
          এক নজরে
        </h1>

        <p className="mt-4 max-w-lg break-words text-sm leading-7 text-gray-600 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <Link
          href="#সব-পণ্য"
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 sm:mt-6 sm:w-auto sm:px-5 sm:text-base"
        >
          সব পণ্যের দাম দেখুন
        </Link>
      </div>

      <div className="flex min-w-0 justify-center md:justify-end">
        <Image
          src="/bazar-hero.png"
          alt="বাজার দর"
          width={500}
          height={400}
          className="h-auto w-full max-w-[280px] object-contain sm:max-w-sm md:max-w-md"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
