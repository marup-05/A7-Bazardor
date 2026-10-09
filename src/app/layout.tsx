import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        <main className="max-w-6xl mx-auto mt-5 mb-3">
          {children}
        </main>
      </body>
    </html>
  );
}