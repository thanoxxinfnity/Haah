import { randomBytes, createHash, timingSafeEqual } from "crypto";

export function randomId(prefix: string, bytes = 8): string {
  return `${prefix}_${randomBytes(bytes).toString("hex")}`;
}

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || randomBytes(3).toString("hex");
}

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Generates a platform API key like "gw-sk-<random>". Returns both the
 *  plaintext (shown once) and the hash+prefix (persisted). */
export function generateApiKey() {
  const secret = randomBytes(24).toString("base64url");
  const plaintext = `gw-sk-${secret}`;
  return {
    plaintext,
    hash: sha256Hex(plaintext),
    prefix: plaintext.slice(0, 12),
  };
}
