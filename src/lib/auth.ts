import { cookies } from "next/headers";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "cipbg_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SECRET = process.env.ADMIN_SECRET || "cipbg-dev-secret-change-me";

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionToken(id: number, email: string): string {
  const payload = `${id}:${email}:${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

function verifyToken(token: string): { id: number; email: string } | null {
  try {
    const [encoded, sig] = token.split(".");
    if (!encoded || !sig) return null;
    const payload = Buffer.from(encoded, "base64url").toString();
    const [idStr, email, expiresStr] = payload.split(":");
    const id = parseInt(idStr, 10);
    const expires = parseInt(expiresStr, 10);
    if (!id || !email || !expires) return null;
    if (Date.now() > expires) return null;
    const expected = sign(payload);
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return { id, email };
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

export { SESSION_COOKIE };
