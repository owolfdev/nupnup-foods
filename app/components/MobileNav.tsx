"use client";

import { useState } from "react";
import Link from "next/link";
import AuthToggle from "./AuthToggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative w-6 h-6 focus:outline-none z-[60] flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <span
          className={`absolute h-[3px] w-6 bg-primary transition-all duration-300 origin-center ${
            isOpen ? "rotate-45" : "-translate-y-[9px] rotate-0"
          }`}
        />
        <span
          className={`absolute h-[3px] w-6 bg-primary transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute h-[3px] w-6 bg-primary transition-all duration-300 origin-center ${
            isOpen ? "-rotate-45" : "translate-y-[9px] rotate-0"
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Sheet */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 p-8 text-gray-600">
          <Link
            href="/about"
            onClick={closeMenu}
            className="transition-colors font-semibold"
          >
            About
          </Link>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-gray-900">Products</span>
            <Link
              href="/products/coconut-syrup"
              onClick={closeMenu}
              className="transition-colors pl-4 text-gray-600 hover:text-primary"
            >
              Coconut Syrup
            </Link>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <AuthToggle variant="text" onAction={closeMenu} />
          </div>
        </div>
      </div>
    </>
  );
}
