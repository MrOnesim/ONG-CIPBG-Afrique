import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let article: typeof articles.$inferSelect | undefined;
  try {
    const [found] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    article = found;
  } catch { /* */ }
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt || article.content.substring(0, 160),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: typeof articles.$inferSelect | undefined;
  try {
    const [found] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    article = found;
    if (article) {
      await db.update(articles).set({ views: (article.views || 0) + 1 }).where(eq(articles.id, article.id));
    }
  } catch { /* */ }

  if (!article) notFound();

  return (
    <>
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/actualites" className="text-blue-200 hover:text-white text-sm mb-4 inline-block">← Retour aux actualités</Link>
          <span className="block text-accent font-semibold text-sm uppercase tracking-wider">{article.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-blue-200 text-sm">
            <span>{new Date(article.createdAt).toLocaleDateString("fr-FR")}</span>
            {article.author && <span>Par {article.author}</span>}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {article.imageUrl && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
            </div>
          )}
          <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </section>
    </>
  );
}
