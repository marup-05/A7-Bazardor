"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  const firstLetter = (
    user?.name?.trim() ||
    user?.email?.trim() ||
    "U"
  ).charAt(0).toUpperCase();

  const currentName = name ?? user?.name ?? "";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = currentName.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === (user?.name ?? "")) {
      toast.info("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(updatedName);
      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="min-h-[400px] animate-pulse bg-[#f0f5f0] p-8">
        <div className="mx-auto h-64 max-w-xl rounded-xl bg-white" />
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-180px)] bg-[#f0f5f0] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-[406px]">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-800">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য দেখুন।
          </p>
        </div>

        {/* User information card */}
        <section className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
              {firstLetter}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-gray-800">
                {currentName || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="shrink-0 rounded-md border border-red-400 px-2.5 py-2 text-[11px] font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
          >
            {signingOut ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
          </button>
        </section>

        {/* Update name card */}
        <section className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
          <h2 className="mb-5 text-sm font-semibold text-gray-800">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-xs font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={currentName}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              maxLength={100}
              className="mb-3 h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            <button
              type="submit"
              disabled={updating || !currentName.trim()}
              className="w-full rounded-md bg-green-700 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}