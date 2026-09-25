import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Galerie photos et vidéos des activités de CIPBG Afrique.",
};

const defaultGallery = [
  { src: "/images/equipe-numerique.jpg", title: "Conférence sur la paix", album: "Événements CIPBG" },
  { src: "/images/education-diplome.jpg", title: "Programme éducation des filles", album: "Éducation" },
  { src: "/images/gouvernance-reunion.jpg", title: "Réunion communautaire", album: "Démocratie" },
  { src: "/images/reboisement-enfant.jpg", title: "Plantation d'arbres communautaire", album: "Environnement" },
  { src: "/images/etudiants-groupe.jpg", title: "Formation professionnelle jeunes", album: "Jeunesse" },
  { src: "/images/atelier-whiteboard.jpg", title: "Atelier bonne gouvernance", album: "Gouvernance" },
  { src: "/images/presentation-reunion.jpg", title: "Dialogue intercommunautaire", album: "Événements CIPBG" },
  { src: "/images/femmes-bureau.jpg", title: "Activité bénévoles", album: "Bénévolat" },
  { src: "/images/aide-communautaire.jpg", title: "Paysage africain", album: "Divers" },
];

export const dynamic = "force-dynamic";

export default async function GaleriePage() {
  let items: typeof galleryItems.$inferSelect[] = [];
  try {
    items = await db.select().from(galleryItems).where(eq(galleryItems.published, true)).orderBy(desc(galleryItems.createdAt));
  } catch { /* */ }

  const showDefault = items.length === 0;

  return (
    <>
      <PageHero
        kicker="Nos moments"
        title="Galerie"
        subtitle="Photos et vidéos de nos activités, événements et projets sur le terrain."
        image="/images/partenaires-office.jpg"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {showDefault ? (
            <>
              <p className="text-center text-slate-500 mb-10">Aperçu de nos activités en images</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {defaultGallery.map((img, i) => (
                  <div
                    key={i}
                    className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                      i === 0 ? "md:row-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <div className={`relative ${i === 0 ? "h-64 md:h-full" : "h-48 md:h-60"}`}>
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm font-semibold">{img.title}</p>
                        <p className="text-white/70 text-xs">{img.album}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square">
                  {item.type === "photo" ? (
                    <Image
                      src={item.url}
                      alt={item.title || "Photo"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <PlayCircle className="w-14 h-14 text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {(item.title || item.album) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {item.title && <p className="text-white text-sm font-semibold">{item.title}</p>}
                      {item.album && <p className="text-white/70 text-xs">{item.album}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
