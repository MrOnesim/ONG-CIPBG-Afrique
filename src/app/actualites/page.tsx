import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { Newspaper, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les dernières actualités de CIPBG Afrique : articles, communiqués, événements.",
};

export const dynamic = "force-dynamic";

export default async function ActualitesPage() {
  let allArticles: typeof articles.$inferSelect[] = [];
  try {
    allArticles = await db.select().from(articles).where(eq(articles.published, true)).orderBy(desc(articles.createdAt));
  } catch { /* tables may not exist */ }

  return (
    <>
      <PageHero
        kicker="Restez informé"
        title="Actualités"
        subtitle="Articles, communiqués et événements de CIPBG Afrique."
        image="/images/governance-workshop.jpg"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {allArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/peace-conference.jpg" alt="" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/education-girls.jpg" alt="" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/environment-tree.jpg" alt="" fill className="object-cover opacity-50" />
                </div>
              </div>
              <Newspaper className="w-14 h-14 mx-auto text-primary/40 mb-4" />
              <p className="text-lg text-slate-500 mb-2">Les actualités seront bientôt publiées.</p>
              <p className="text-sm text-slate-400">Restez connecté pour suivre les actions de CIPBG Afrique.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/actualites/${a.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block group border border-slate-100"
                >
                  <div className="h-52 relative overflow-hidden">
                    {a.imageUrl ? (
                      <Image src={a.imageUrl} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Image src="/images/governance-workshop.jpg" alt={a.title} fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md uppercase">{a.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                      <span><Calendar className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{new Date(a.createdAt).toLocaleDateString("fr-FR")}</span>
                      {a.author && <span>• {a.author}</span>}
                    </div>
                    <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-primary-light transition-colors">{a.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3">{a.excerpt || a.content.substring(0, 150)}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold">
                      Lire la suite
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
