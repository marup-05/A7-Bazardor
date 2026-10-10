import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        <main className="mx-auto my-4 w-full max-w-6xl min-w-0 flex-1 px-3 sm:my-5 sm:px-4">
          {children}
        </main>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={3}
        />

        <Footer />
      </body>
    </html>
  );
}
