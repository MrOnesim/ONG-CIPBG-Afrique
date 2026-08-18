import { db } from "@/db";
import { articles } from "@/db/schema";
import { verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const all = await db.select().from(articles).orderBy(desc(articles.createdAt));
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

  const [created] = await db.insert(articles).values({
    title: body.title,
    slug,
    content: body.content || "",
    excerpt: body.excerpt || null,
    imageUrl: body.imageUrl || null,
    category: body.category || "actualites",
    author: body.author || admin.name,
    published: body.published ?? false,
  }).returning();

  return NextResponse.json(created);
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const [updated] = await db.update(articles).set({
    title: body.title,
    content: body.content,
    excerpt: body.excerpt,
    imageUrl: body.imageUrl,
    category: body.category,
    author: body.author,
    published: body.published,
    updatedAt: new Date(),
  }).where(eq(articles.id, body.id)).returning();

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  await db.delete(articles).where(eq(articles.id, id));
  return NextResponse.json({ success: true });
}
