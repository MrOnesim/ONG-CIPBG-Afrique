import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ClipboardList, MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos projets",
  description: "Découvrez les projets réalisés et en cours de CIPBG Afrique pour la paix et la bonne gouvernance.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let allProjects: typeof projects.$inferSelect[] = [];
  try {
    allProjects = await db.select().from(projects).where(eq(projects.published, true)).orderBy(desc(projects.createdAt));
  } catch { /* tables may not exist */ }

  return (
    <>
      <PageHero
        kicker="Nos réalisations"
        title="Nos Projets"
        subtitle="Retrouvez ici l'ensemble des projets menés par CIPBG Afrique pour la paix et la bonne gouvernance."
        image="/images/youth-training.jpg"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {allProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/peace-conference.jpg" alt="Paix" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/education-girls.jpg" alt="Éducation" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/environment-tree.jpg" alt="Environnement" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/youth-training.jpg" alt="Formation" fill className="object-cover opacity-50" />
                </div>
              </div>
              <ClipboardList className="w-14 h-14 mx-auto text-primary/40 mb-4" />
              <p className="text-lg text-slate-500 mb-2">Les projets seront bientôt publiés.</p>
              <p className="text-sm text-slate-400">CIPBG Afrique prépare de nombreux projets pour la paix et la bonne gouvernance.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                  <div className="relative h-52 overflow-hidden">
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Image src="/images/peace-conference.jpg" alt={p.name} fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium shadow-md ${
                        p.status === "termine" ? "bg-green-500 text-white" :
                        p.status === "a_venir" ? "bg-blue-500 text-white" :
                        "bg-yellow-500 text-white"
                      }`}>
                        {p.status === "termine" ? "Terminé" : p.status === "a_venir" ? "À venir" : "En cours"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-accent uppercase">{p.category}</span>
                    <h3 className="font-bold text-primary text-lg mb-2 mt-1">{p.name}</h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-3">{p.description}</p>
                    {p.zone && <p className="text-xs text-slate-400"><MapPin className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{p.zone}</p>}
                    {p.startDate && (
                      <p className="text-xs text-slate-400 mt-1">
                        <Calendar className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{new Date(p.startDate).toLocaleDateString("fr-FR")}
                        {p.endDate && ` – ${new Date(p.endDate).toLocaleDateString("fr-FR")}`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
