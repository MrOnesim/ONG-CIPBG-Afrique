import { db } from "@/db";
import { partners } from "@/db/schema";
import { verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const all = await db.select().from(partners).orderBy(desc(partners.createdAt));
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const [created] = await db.insert(partners).values({
    name: body.name,
    description: body.description || null,
    logoUrl: body.logoUrl || null,
    website: body.website || null,
    partnershipType: body.partnershipType || null,
    published: body.published ?? true,
  }).returning();

  return NextResponse.json(created);
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  await db.delete(partners).where(eq(partners.id, id));
  return NextResponse.json({ success: true });
}
