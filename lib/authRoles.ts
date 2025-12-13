export type AuthRole = "partner" | "admin";

export function getRoleForKey(
  key: string | null | undefined,
  partnerKeys: Set<string> | string[],
  adminKeys: Set<string> | string[]
): AuthRole | null {
  if (!key) return null;

  const trimmed = key.trim();
  if (!trimmed) return null;

  const adminSet = adminKeys instanceof Set ? adminKeys : new Set(adminKeys);
  if (adminSet.has(trimmed)) {
    return "admin";
  }

  const partnerSet =
    partnerKeys instanceof Set ? partnerKeys : new Set(partnerKeys);
  if (partnerSet.has(trimmed)) {
    return "partner";
  }

  return null;
}
