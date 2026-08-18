import { db } from "@/db";
import { applications } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lastName, firstName, email, phone, city, profession, domain, motivation, participationType } = body;
    if (!lastName || !firstName || !email || !participationType) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }
    await db.insert(applications).values({
      lastName,
      firstName,
      email,
      phone: phone || null,
      city: city || null,
      profession: profession || null,
      domain: domain || null,
      motivation: motivation || null,
      participationType,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
