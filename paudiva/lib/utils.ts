export function formatPrice(amount: number | string) {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomUUID()
    .replace(/-/g, "")
    .slice(0, 6)
    .toUpperCase();

  return `PAU-${timestamp}-${random}`;
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPagination(page: number, limit: number) {
  const safePage = Math.max(1, Math.floor(page || 1));
  const safeLimit = Math.min(50, Math.max(1, Math.floor(limit || 12)));

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
}

export function isValidIndianPincode(value: string) {
  return /^[1-9][0-9]{5}$/.test(value);
}

export function isValidIndianMobile(value: string) {
  return /^[6-9][0-9]{9}$/.test(value);
}