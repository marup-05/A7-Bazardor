import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[70vh]">
      <div className="mb-3 text-5xl sm:mb-4 sm:text-7xl">
        🛒
      </div>

      <h1 className="text-5xl font-extrabold text-green-700 sm:text-6xl">
        404
      </h1>

      <h2 className="mt-4 max-w-full text-xl font-bold text-gray-800 sm:text-2xl">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
        আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে।
        সঠিক ঠিকানা দিয়ে আবার চেষ্টা করুন।
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:px-6"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
