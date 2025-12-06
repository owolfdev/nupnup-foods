import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nup Nup Foods",
  description: "Nup Nup Foods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="w-full px-8">
          <nav className="flex items-center justify-between max-w-7xl mx-auto h-[81px]">
            <Link href="/" className="shrink-0 h-full flex items-center">
              <Image
                src="/logo/logo.png"
                alt="Nup Nup Foods Logo"
                width={200}
                height={81}
                priority
                className="h-full w-auto"
              />
            </Link>
            <div className="flex gap-8 items-center h-full">
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary transition-colors font-medium leading-none"
              >
                About
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-primary transition-colors font-medium leading-none"
              >
                Products
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="sticky bottom-0 w-full py-4 text-center text-sm text-gray-600">
          © {currentYear} Nup Nup Foods
        </footer>
      </body>
    </html>
  );
}
