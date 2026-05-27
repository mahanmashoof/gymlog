import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GymLog",
  description: "Track your workouts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white border-b px-8 py-4">
          <Link href="/" className="text-xl font-bold">
            GymLog 🏋️
          </Link>
        </nav>
        <main className="max-w-4xl mx-auto px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
