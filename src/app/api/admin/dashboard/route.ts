import { db } from "@/db";
import { articles, projects, activities, contactMessages, applications, newsletters } from "@/db/schema";
import { verifyAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import { count } from "drizzle-orm";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const [articleCount] = await db.select({ value: count() }).from(articles);
  const [projectCount] = await db.select({ value: count() }).from(projects);
  const [activityCount] = await db.select({ value: count() }).from(activities);
  const [messageCount] = await db.select({ value: count() }).from(contactMessages);
  const [applicationCount] = await db.select({ value: count() }).from(applications);
  const [newsletterCount] = await db.select({ value: count() }).from(newsletters);

  return NextResponse.json({
    articles: articleCount.value,
    projects: projectCount.value,
    activities: activityCount.value,
    messages: messageCount.value,
    applications: applicationCount.value,
    newsletters: newsletterCount.value,
  });
}
