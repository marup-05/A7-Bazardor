import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

const Hero = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="grid items-center gap-8 rounded-2xl bg-green-50 px-6 py-10 md:grid-cols-2 md:px-10">
      <div>
        <p className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-green-600">
          {date}
        </p>

        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
          আজকের বাজারের দাম
          <br />
          এক নজরে
        </h1>

        <p className="mt-4 max-w-lg text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <Link
          href="#সব-পণ্য"
          className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          সব পণ্যের দাম দেখুন
        </Link>
      </div>

      <div className="flex justify-center md:justify-end">
        <Image
          src="/bazar-hero.png"
          alt="বাজার দর"
          width={500}
          height={400}
          className="h-auto w-full max-w-md object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;