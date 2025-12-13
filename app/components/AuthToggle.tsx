"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface AuthToggleProps {
  variant?: "icon" | "text";
  className?: string;
  onAction?: () => void;
}

export default function AuthToggle({
  variant = "icon",
  className = "",
  onAction,
}: AuthToggleProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedKey = localStorage.getItem("auth_key");
      setIsAuthenticated(!!storedKey);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  if (isAuthenticated) {
    return (
      <LogoutButton
        className={className}
        onLogout={onAction}
      />
    );
  }

  if (variant === "text") {
    return (
      <Link
        href="/login"
        onClick={onAction}
        className={`text-gray-700 hover:text-primary transition-colors font-semibold ${className}`}
      >
        Login
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onAction}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${className}`}
      aria-label="Log in"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-3.866 0-7 2.239-7 5v1h14v-1c0-2.761-3.134-5-7-5Z" />
      </svg>
    </Link>
  );
}
