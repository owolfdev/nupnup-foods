"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  validKeys: string[];
}

export default function AuthGuard({ children, validKeys }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount
    const storedKey = localStorage.getItem("auth_key");
    if (storedKey && validKeys.includes(storedKey)) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [validKeys]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (validKeys.includes(key)) {
      localStorage.setItem("auth_key", key);
      setIsAuthenticated(true);
      // Dispatch custom event for LogoutButton to detect
      window.dispatchEvent(new Event("auth-change"));
      router.refresh(); // Refresh to show logout button in header
    } else {
      setError("Invalid key. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_key");
    setIsAuthenticated(false);
    setKey("");
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Authentication Required
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="key"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter Access Key
                </label>
                <input
                  id="key"
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your key"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

