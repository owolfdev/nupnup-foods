"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getRoleForKey, type AuthRole } from "@/lib/authRoles";

interface FooterLinksProps {
  partnerKeys: string[];
  adminKeys: string[];
}

export default function FooterLinks({
  partnerKeys,
  adminKeys,
}: FooterLinksProps) {
  const [role, setRole] = useState<AuthRole | null>(null);
  const partnerSet = useMemo(() => new Set(partnerKeys), [partnerKeys]);
  const adminSet = useMemo(() => new Set(adminKeys), [adminKeys]);

  useEffect(() => {
    const evaluateRole = () => {
      const storedKey = localStorage.getItem("auth_key");
      const storedRole = localStorage.getItem("auth_role") as AuthRole | null;
      const resolvedRole = getRoleForKey(storedKey, partnerSet, adminSet);
      const finalRole =
        resolvedRole && storedRole === resolvedRole ? storedRole : resolvedRole;

      setRole(finalRole);
    };

    evaluateRole();
    window.addEventListener("storage", evaluateRole);
    window.addEventListener("auth-change", evaluateRole);

    return () => {
      window.removeEventListener("storage", evaluateRole);
      window.removeEventListener("auth-change", evaluateRole);
    };
  }, [adminSet, partnerSet]);

  if (!role) {
    return null;
  }

  return (
    <>
      <Link
        href="/brand"
        className="text-gray-600 hover:text-primary transition-colors"
      >
        Partners
      </Link>
      {role === "admin" ? (
        <Link
          href="/admin"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          Admin
        </Link>
      ) : null}
    </>
  );
}
