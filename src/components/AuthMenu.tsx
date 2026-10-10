"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AuthMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-green-600"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const firstLetter = (
    user.name?.trim() ||
    user.email?.trim() ||
    "U"
  ).charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label="প্রোফাইল মেনু"
        className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-green-50"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 font-semibold text-white">
          {firstLetter}
        </span>

        <span className="max-w-28 truncate text-xs font-semibold text-gray-800">
          {user.name || user.email}
        </span>

        <span className="text-xs text-gray-500">⌄</span>
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
            <div className="border-b border-gray-100 px-3 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 font-semibold text-white">
                  {firstLetter}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {user.name || "ব্যবহারকারী"}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <span className="mr-2">👤</span>
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              <span className="mr-2">↪</span>
              {signingOut
                ? "সাইন আউট হচ্ছে..."
                : "সাইন আউট"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
