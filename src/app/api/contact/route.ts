import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }
    await db.insert(contactMessages).values({
      name,
      email,
      phone: phone || null,
      subject,
      message,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
