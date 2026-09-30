import { cookies } from "next/headers";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "cipbg_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function requireSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SECRET is not set. Refusing to sign sessions with a fallback key.",
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", requireSecret()).update(value).digest("hex");
}

type SessionPayload = { id: number; email: string; exp: number };

export function createSessionToken(id: number, email: string): string {
  const payload = JSON.stringify({
    id,
    email,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  } satisfies SessionPayload);
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

function verifyToken(token: string): SessionPayload | null {
  try {
    const [encoded, sig] = token.split(".");
    if (!encoded || !sig) return null;
    const payload = Buffer.from(encoded, "base64url").toString();
    const parsed = JSON.parse(payload) as Partial<SessionPayload>;
    if (
      typeof parsed.id !== "number" ||
      typeof parsed.email !== "string" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }
    if (Date.now() > parsed.exp) return null;
    const expected = sign(payload);
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return { id: parsed.id, email: parsed.email, exp: parsed.exp };
  } catch {
    return null;
  }
}

export async function verifyAdmin(): Promise<{ id: number; name: string; email: string; role: string } | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return null;

  const payload = verifyToken(session.value);
  if (!payload) return null;

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, payload.id)).limit(1);
  if (!user || user.email !== payload.email) return null;

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
