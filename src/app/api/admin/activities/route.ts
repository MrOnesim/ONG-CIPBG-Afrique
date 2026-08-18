import { db } from "@/db";
import { activities } from "@/db/schema";
import { verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const all = await db.select().from(activities).orderBy(desc(activities.createdAt));
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9à-ÿ\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 200) + "-" + Date.now();

  const [created] = await db.insert(activities).values({
    title: body.title,
    slug,
    description: body.description || "",
    type: body.type || "conference",
    date: body.date ? new Date(body.date) : null,
    location: body.location || null,
    imageUrl: body.imageUrl || null,
    videoUrl: body.videoUrl || null,
    results: body.results || null,
    published: body.published ?? false,
  }).returning();

  return NextResponse.json(created);
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const [updated] = await db.update(activities).set({
    title: body.title,
    description: body.description,
    type: body.type,
    date: body.date ? new Date(body.date) : null,
    location: body.location,
    imageUrl: body.imageUrl,
    videoUrl: body.videoUrl,
    results: body.results,
    published: body.published,
    updatedAt: new Date(),
  }).where(eq(activities.id, body.id)).returning();

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  await db.delete(activities).where(eq(activities.id, id));
  return NextResponse.json({ success: true });
}
