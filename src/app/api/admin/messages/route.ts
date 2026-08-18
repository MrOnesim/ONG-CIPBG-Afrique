import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const all = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  return NextResponse.json(all);
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  return NextResponse.json({ success: true });
}
