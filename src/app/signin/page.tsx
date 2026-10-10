"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.72 5.99c4.51-4.17 7.05-10.31 7.05-17.64Z" />
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.72-5.99c-2.14 1.44-4.89 2.3-8.19 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.91.1-.72.39-1.2.7-1.48-2.47-.28-5.06-1.23-5.06-5.48 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.98 0 4.26-2.6 5.2-5.08 5.48.4.34.75 1 .75 2.01v3.14c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

const SigninPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading || googleLoading || githubLoading) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড পূরণ করুন।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.replace("/");
        router.refresh();
      } else {
        toast.error("সাইন ইন নিশ্চিত করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading || googleLoading || githubLoading) return;

    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?authSuccess=google",
        errorCallbackURL: "/signin",
      });

      if (error) {
        toast.error(
          error.message || "Google দিয়ে সাইন ইন করা যায়নি।"
        );
        setGoogleLoading(false);
      }
    toast.success("Google দিয়ে সাইন ইন সফল হয়েছে!");

    } catch {
      toast.error(
        "Google authentication-এ সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
      setGoogleLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    if (loading || googleLoading || githubLoading) return;

    setGithubLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/?authSuccess=github",
        errorCallbackURL: "/signin",
      });

      if (error) {
        toast.error(
          error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।"
        );
        setGithubLoading(false);
      }
      toast.success("GitHub দিয়ে সাইন ইন সফল হয়েছে!");

    } catch {
      toast.error(
        "GitHub authentication-এ সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
      setGithubLoading(false);
    }
  };

  return (
    <div className="flex min-h-[650px] w-full flex-col items-center justify-center bg-[#f1f5f0] px-4 py-10">
      <div className="w-full max-w-[360px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#26332a]">
            সাইন ইন
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </header>

        <div className="rounded-2xl border border-[#e0e8df] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[#26332a]">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-[42px] w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-[#26332a]">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="তোমার পাসওয়ার্ড"
                required
                className="h-[42px] w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading || githubLoading}
              className="h-9 w-full rounded-lg bg-green-700 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe7df]" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe7df]" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading || githubLoading}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dfe7df] px-2 text-[11px] font-semibold text-gray-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <GoogleIcon />
              <span>
                {googleLoading ? "Google-এ যাচ্ছেন..." : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={githubLoading || googleLoading || loading}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dfe7df] px-2 text-[11px] font-semibold text-gray-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <GithubIcon />
              <span>
                {githubLoading ? "GitHub-এ যাচ্ছেন..." : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-[#26332a]">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-green-700 hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link href="/" className="text-xs text-gray-500 transition hover:text-green-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
