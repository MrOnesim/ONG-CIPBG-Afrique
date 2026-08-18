import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { Mic, Wrench, BookOpen, Volume2, Megaphone, Landmark, Globe, Home, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Activités",
  description: "Les activités de CIPBG Afrique : conférences, ateliers, formations, sensibilisations et plus.",
};

const activityTypes = [
  { icon: Mic, label: "Conférences" },
  { icon: Wrench, label: "Ateliers" },
  { icon: BookOpen, label: "Formations" },
  { icon: Volume2, label: "Sensibilisations" },
  { icon: Megaphone, label: "Campagnes" },
  { icon: Landmark, label: "Colloques" },
  { icon: Globe, label: "Forums" },
  { icon: Home, label: "Communautaires" },
];

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {
  let allActivities: typeof activities.$inferSelect[] = [];
  try {
    allActivities = await db.select().from(activities).where(eq(activities.published, true)).orderBy(desc(activities.date));
  } catch { /* tables may not exist */ }

  return (
    <>
      <PageHero
        kicker="En action"
        title="Nos Activités"
        subtitle="Conférences, ateliers, formations, sensibilisations et campagnes menées sur le terrain."
        image="/images/peace-conference.jpg"
      />

      {/* Activity types */}
      <section className="py-10 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {activityTypes.map((t) => (
              <div key={t.label} className="bg-white rounded-full px-5 py-2 shadow-sm text-sm flex items-center gap-2 text-slate-600">
                <t.icon className="w-4 h-4 text-secondary" /> {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {allActivities.length === 0 ? (
            <div className="text-center py-16">
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/peace-conference.jpg" alt="" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/governance-workshop.jpg" alt="" fill className="object-cover opacity-50" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/community-meeting.jpg" alt="" fill className="object-cover opacity-50" />
                </div>
              </div>
              <Calendar className="w-14 h-14 mx-auto text-secondary/60 mb-4" />
              <p className="text-lg text-slate-500 mb-2">Les activités seront bientôt publiées.</p>
              <p className="text-sm text-slate-400">CIPBG Afrique organise régulièrement des activités de sensibilisation et formation.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {allActivities.map((a) => (
                <div key={a.id} className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col md:flex-row group">
                  <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                    {a.imageUrl ? (
                      <Image src={a.imageUrl} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Image src="/images/peace-conference.jpg" alt={a.title} fill className="object-cover opacity-60" />
                    )}
                  </div>
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-white bg-secondary px-3 py-1.5 rounded-full uppercase">{a.type}</span>
                      {a.date && <span className="text-sm text-slate-400"><Calendar className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{new Date(a.date).toLocaleDateString("fr-FR")}</span>}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{a.title}</h3>
                    {a.location && <p className="text-sm text-slate-400 mb-3"><MapPin className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{a.location}</p>}
                    <p className="text-slate-600 leading-relaxed">{a.description}</p>
                    {a.results && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                        <span className="text-xs font-semibold text-green-700"><CheckCircle2 className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />Résultats :</span>
                        <p className="text-sm text-green-800 mt-1">{a.results}</p>
                      </div>
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
