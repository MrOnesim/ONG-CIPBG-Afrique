import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { partners } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Partenaires",
  description: "Découvrez les partenaires de CIPBG Afrique et rejoignez notre réseau.",
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  let allPartners: typeof partners.$inferSelect[] = [];
  try {
    allPartners = await db.select().from(partners).where(eq(partners.published, true)).orderBy(desc(partners.createdAt));
  } catch { /* */ }

  return (
    <>
      <PageHero
        kicker="Ensemble"
        title="Nos Partenaires"
        subtitle="Nos partenaires techniques, financiers et institutionnels engagés à nos côtés."
        image="/images/partners-bg.jpg"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {allPartners.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative h-56 max-w-xl mx-auto rounded-2xl overflow-hidden shadow-md mb-8">
                <Image
                  src="/images/partners-handshake.jpg"
                  alt="Partenariat"
                  fill
                  className="object-cover opacity-60"
                />
              </div>
              <Handshake className="w-14 h-14 mx-auto text-primary/40 mb-4" />
              <p className="text-lg text-slate-500 mb-2">Nos partenaires seront bientôt présentés ici.</p>
              <p className="text-sm text-slate-400 mb-6">Contactez-nous pour explorer les opportunités de partenariat.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPartners.map((p) => (
                <div key={p.id} className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-slate-100">
                  {p.logoUrl ? (
                    <div className="relative h-20 w-40 mx-auto mb-4">
                      <Image src={p.logoUrl} alt={p.name} fill unoptimized className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 text-primary" /></div>
                  )}
                  <h3 className="font-bold text-primary text-lg mb-2">{p.name}</h3>
                  {p.partnershipType && (
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{p.partnershipType}</span>
                  )}
                  {p.description && <p className="text-sm text-slate-600 mt-3">{p.description}</p>}
                  {p.website && (
                    <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
                      Visiter le site →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/partners-meeting.jpg"
              alt="Devenir partenaire"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/80" />
            <div className="relative z-10 p-10 md:p-14 text-center text-white">
              <h3 className="text-3xl font-bold mb-3">Devenir partenaire</h3>
              <p className="text-green-100 mb-6 max-w-xl mx-auto text-lg">
                Vous souhaitez soutenir nos actions ou collaborer avec CIPBG Afrique ?
                Contactez-nous pour explorer les opportunités de partenariat.
              </p>
              <Link href="/contact" className="bg-white text-secondary px-8 py-3.5 rounded-full font-semibold hover:bg-green-50 transition-colors inline-block shadow-lg">
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
