import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { ScrollText, BarChart3, FileText, ClipboardList, BookOpen, FolderOpen, Calendar, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Documents & Rapports",
  description: "Consultez et téléchargez les documents officiels, rapports et publications de CIPBG Afrique.",
};

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  let allDocs: typeof documents.$inferSelect[] = [];
  try {
    allDocs = await db.select().from(documents).where(eq(documents.published, true)).orderBy(desc(documents.createdAt));
  } catch { /* */ }

  return (
    <>
      <PageHero
        kicker="Ressources"
        title="Documents & Rapports"
        subtitle="Statuts, rapports d'activités, publications et documents officiels de CIPBG Afrique."
        image="/images/governance-workshop.jpg"
      />

      {/* Document categories */}
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: ScrollText, label: "Statuts" },
              { icon: BarChart3, label: "Rapports" },
              { icon: FileText, label: "Communiqués" },
              { icon: ClipboardList, label: "Projets" },
              { icon: BookOpen, label: "Publications" },
              { icon: FolderOpen, label: "Brochures" },
            ].map((c) => (
              <span key={c.label} className="bg-white rounded-full px-5 py-2 shadow-sm text-sm text-slate-600 inline-flex items-center gap-2">
                <c.icon className="w-4 h-4 text-primary" /> {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {allDocs.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative h-48 max-w-md mx-auto rounded-2xl overflow-hidden shadow-md mb-8">
                <Image src="/images/governance-workshop.jpg" alt="" fill className="object-cover opacity-50" />
              </div>
              <FileText className="w-14 h-14 mx-auto text-primary/40 mb-4" />
              <p className="text-lg text-slate-500 mb-2">Les documents seront bientôt disponibles.</p>
              <p className="text-sm text-slate-400">Statuts, rapports et publications de CIPBG Afrique seront publiés ici.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {allDocs.map((doc) => (
                <div key={doc.id} className="bg-slate-50 rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow border border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl shrink-0"><FileText className="w-5 h-5 text-primary" /></div>
                    <div>
                      <span className="text-xs font-semibold text-accent uppercase">{doc.category}</span>
                      <h3 className="font-bold text-primary mt-1">{doc.title}</h3>
                      {doc.description && <p className="text-sm text-slate-500 mt-1">{doc.description}</p>}
                      <p className="text-xs text-slate-400 mt-1"><Calendar className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{new Date(doc.createdAt).toLocaleDateString("fr-FR")}</p>
                    </div>
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Télécharger
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
