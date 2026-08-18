import { db } from "@/db";
import { projects } from "@/db/schema";
import { verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const all = await db.select().from(projects).orderBy(desc(projects.createdAt));
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const slug = body.name
    .toLowerCase()
    .replace(/[^a-z0-9à-ÿ\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 200) + "-" + Date.now();

  const [created] = await db.insert(projects).values({
    name: body.name,
    slug,
    description: body.description || "",
    objectives: body.objectives || null,
    zone: body.zone || null,
    beneficiaries: body.beneficiaries || null,
    partners: body.partners || null,
    startDate: body.startDate ? new Date(body.startDate) : null,
    endDate: body.endDate ? new Date(body.endDate) : null,
    status: body.status || "en_cours",
    category: body.category || "paix",
    imageUrl: body.imageUrl || null,
    results: body.results || null,
    published: body.published ?? false,
  }).returning();

  return NextResponse.json(created);
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const [updated] = await db.update(projects).set({
    name: body.name,
    description: body.description,
    objectives: body.objectives,
    zone: body.zone,
    beneficiaries: body.beneficiaries,
    partners: body.partners,
    startDate: body.startDate ? new Date(body.startDate) : null,
    endDate: body.endDate ? new Date(body.endDate) : null,
    status: body.status,
    category: body.category,
    imageUrl: body.imageUrl,
    results: body.results,
    published: body.published,
    updatedAt: new Date(),
  }).where(eq(projects.id, body.id)).returning();

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  await db.delete(projects).where(eq(projects.id, id));
  return NextResponse.json({ success: true });
}
