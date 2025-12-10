import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./components/MobileNav";
import ProductsDropdown from "./components/ProductsDropdown";
import LogoutButton from "./components/LogoutButton";
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
        <header className="w-full sm:px-8 px-4 py-3 relative z-50">
          <nav className="flex items-center justify-between max-w-7xl mx-auto h-[60px]">
            <Link href="/" className="shrink-0 h-full flex items-center">
              <Image
                src="/logo/logo.png"
                alt="Nup Nup Foods Logo"
                width={150}
                height={60}
                priority
                className="h-full w-auto"
              />
            </Link>
            <div className="hidden md:flex gap-8 items-center h-full pr-2">
              <Link
                href="/about"
                className="text-gray-600 hover:text-primary transition-colors leading-none"
              >
                About
              </Link>
              <ProductsDropdown />
              <LogoutButton />
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </nav>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="w-full py-6 text-center text-gray-600 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <span>© {currentYear} Nup Nup Foods</span>
            <Link
              href="/brand"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Partners
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
