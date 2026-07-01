import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import LogoutButton from "@/components/LogoutButton";

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
        <nav className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold tracking-tight">
              GymLog 🏋️
            </Link>
            <div className="flex gap-6">
              <Link
                href="/workouts"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Workouts
              </Link>
              <Link
                href="/exercises"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Exercises
              </Link>
            </div>
          </div>
          <LogoutButton />
        </nav>
        <main className="max-w-4xl mx-auto px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
