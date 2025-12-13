"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { getRoleForKey, type AuthRole } from "@/lib/authRoles";

interface LoginFormProps {
  partnerKeys: string[];
  adminKeys: string[];
}

export default function LoginForm({
  partnerKeys,
  adminKeys,
}: LoginFormProps) {
  const router = useRouter();
  const partnerSet = useMemo(() => new Set(partnerKeys), [partnerKeys]);
  const adminSet = useMemo(() => new Set(adminKeys), [adminKeys]);

  const resolveStoredRole = useCallback(() => {
    if (typeof window === "undefined") return null;

    const storedKey = localStorage.getItem("auth_key");
    const storedRole = localStorage.getItem("auth_role") as AuthRole | null;
    const resolvedRole = getRoleForKey(storedKey, partnerSet, adminSet);

    return resolvedRole && storedRole === resolvedRole
      ? storedRole
      : resolvedRole;
  }, [adminSet, partnerSet]);

  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [currentRole, setCurrentRole] = useState<AuthRole | null>(
    resolveStoredRole
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentRole(resolveStoredRole());
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [resolveStoredRole]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedKey = key.trim();
    const resolvedRole = getRoleForKey(trimmedKey, partnerSet, adminSet);

    if (!resolvedRole) {
      setError("Invalid key. Please try again.");
      return;
    }

    localStorage.setItem("auth_key", trimmedKey);
    localStorage.setItem("auth_role", resolvedRole);
    window.dispatchEvent(new Event("auth-change"));
    setCurrentRole(resolvedRole);
    setKey("");
    router.refresh();
    router.push(resolvedRole === "admin" ? "/admin" : "/brand");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="key"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter partner or admin key
        </label>
        <input
          id="key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Paste your access key"
          required
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {currentRole ? (
        <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">
          Logged in with <span className="font-semibold">{currentRole}</span>{" "}
          access. Footer links will appear for your role.
        </div>
      ) : null}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        Unlock access
      </button>
    </form>
  );
}
