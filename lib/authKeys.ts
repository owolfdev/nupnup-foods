const parseKeys = (value?: string) =>
  (value || "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);

export function getAuthKeys() {
  const basePartnerKeys = parseKeys(process.env.AUTH_KEYS);
  const partnerKeys = Array.from(
    new Set([...basePartnerKeys, ...parseKeys(process.env.PARTNER_AUTH_KEYS)])
  );

  const adminKeys = parseKeys(process.env.ADMIN_AUTH_KEYS);

  return { partnerKeys, adminKeys };
}
