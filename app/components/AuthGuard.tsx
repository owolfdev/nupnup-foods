"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getRoleForKey, type AuthRole } from "@/lib/authRoles";

interface AuthGuardProps {
  children: React.ReactNode;
  partnerKeys: string[];
  adminKeys: string[];
  allowedRoles?: AuthRole[];
}

const AUTH_KEY_STORAGE = "auth_key";
const AUTH_ROLE_STORAGE = "auth_role";
const DEFAULT_ALLOWED_ROLES: AuthRole[] = ["partner", "admin"];

export default function AuthGuard({
  children,
  partnerKeys,
  adminKeys,
  allowedRoles = DEFAULT_ALLOWED_ROLES,
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [activeRole, setActiveRole] = useState<AuthRole | null>(null);
  const router = useRouter();

  const partnerSet = useMemo(() => new Set(partnerKeys), [partnerKeys]);
  const adminSet = useMemo(() => new Set(adminKeys), [adminKeys]);
  const allowed = useMemo(() => [...allowedRoles], [allowedRoles]);

  useEffect(() => {
    const evaluateAuth = () => {
      const storedKey = localStorage.getItem(AUTH_KEY_STORAGE);
      const storedRole = localStorage.getItem(AUTH_ROLE_STORAGE) as
        | AuthRole
        | null;
      const resolvedRole = getRoleForKey(storedKey, partnerSet, adminSet);
      const roleToUse =
        resolvedRole && storedRole === resolvedRole ? storedRole : resolvedRole;

      if (roleToUse && allowed.includes(roleToUse)) {
        setIsAuthenticated(true);
        setActiveRole(roleToUse);
      } else {
        setIsAuthenticated(false);
        setActiveRole(null);
      }

      setIsLoading(false);
    };

    evaluateAuth();
    window.addEventListener("storage", evaluateAuth);
    window.addEventListener("auth-change", evaluateAuth);

    return () => {
      window.removeEventListener("storage", evaluateAuth);
      window.removeEventListener("auth-change", evaluateAuth);
    };
  }, [adminSet, allowed, partnerSet]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedKey = key.trim();
    const resolvedRole = getRoleForKey(trimmedKey, partnerSet, adminSet);

    if (resolvedRole && allowed.includes(resolvedRole)) {
      localStorage.setItem(AUTH_KEY_STORAGE, trimmedKey);
      localStorage.setItem(AUTH_ROLE_STORAGE, resolvedRole);
      setIsAuthenticated(true);
      setActiveRole(resolvedRole);
      setKey("");
      window.dispatchEvent(new Event("auth-change"));
      router.refresh();
    } else {
      setError("Invalid key. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !activeRole) {
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
                  Enter Partner/Admin Key
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
