import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../../providers/AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="bg-gray-50 dark:bg-gray-900 h-screen">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
