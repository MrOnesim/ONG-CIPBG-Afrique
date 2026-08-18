import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Seed désactivé en production" }, { status: 403 });
  }
  try {
    // Check if admin already exists
    const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, "admin@cipbgafrique.org")).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hash = await hashPassword("cipbg2024admin");
    await db.insert(adminUsers).values({
      email: "admin@cipbgafrique.org",
      passwordHash: hash,
      name: "Administrateur CIPBG",
      role: "superadmin",
    });

    return NextResponse.json({ success: true, message: "Admin created: admin@cipbgafrique.org / cipbg2024admin" });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
