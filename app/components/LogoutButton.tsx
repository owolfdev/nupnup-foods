"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if auth key exists in localStorage
    const checkAuth = () => {
      const storedKey = localStorage.getItem("auth_key");
      setIsAuthenticated(!!storedKey);
    };

    checkAuth();

    // Listen for storage changes (works across tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    // Listen for custom event (for same-tab changes)
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_key");
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("auth-change"));
    router.refresh();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 hover:text-primary transition-colors leading-none"
    >
      Logout
    </button>
  );
}

