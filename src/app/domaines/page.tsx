import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  Bird,
  Scale,
  Landmark,
  SearchCheck,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Vote,
  Sprout,
  Handshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Domaines d'intervention",
  description: "Les dix domaines d'intervention de CIPBG Afrique pour la paix et la bonne gouvernance.",
};

const domains = [
  { icon: Bird, title: "Paix et cohésion sociale", desc: "Promouvoir la paix et le vivre-ensemble entre les communautés à travers le dialogue intercommunautaire, la médiation et les initiatives de réconciliation.", img: "/images/peace-conference.jpg", color: "from-blue-600" },
  { icon: Scale, title: "Bonne gouvernance", desc: "Encourager la transparence, la redevabilité et la responsabilité dans la gestion des affaires publiques à tous les niveaux.", img: "/images/governance-workshop.jpg", color: "from-indigo-600" },
  { icon: Landmark, title: "Démocratie et citoyenneté", desc: "Renforcer la culture démocratique, la participation citoyenne et l'engagement civique des populations.", img: "/images/community-meeting.jpg", color: "from-purple-600" },
  { icon: SearchCheck, title: "Transparence et lutte contre la corruption", desc: "Combattre la corruption sous toutes ses formes et promouvoir l'intégrité dans les institutions publiques et privées.", img: "/images/governance-workshop.jpg", color: "from-red-600" },
  { icon: GraduationCap, title: "Éducation des filles", desc: "Favoriser l'accès à l'éducation de qualité pour les filles en milieu urbain et rural, lutter contre les obstacles à la scolarisation.", img: "/images/education-girls.jpg", color: "from-pink-600" },
  { icon: Briefcase, title: "Emploi et autonomisation des jeunes", desc: "Promouvoir l'insertion professionnelle et l'autonomisation économique des jeunes à travers la formation et l'entrepreneuriat.", img: "/images/youth-training.jpg", color: "from-amber-600" },
  { icon: ShieldCheck, title: "Prévention de l'extrémisme violent", desc: "Sensibiliser les populations, en particulier les jeunes, sur les risques liés à l'extrémisme violent et au radicalisme.", img: "/images/peace-conference.jpg", color: "from-orange-600" },
  { icon: Vote, title: "Prévention des violences électorales", desc: "Promouvoir des élections pacifiques et non-violentes avant, pendant et après les processus électoraux.", img: "/images/community-meeting.jpg", color: "from-teal-600" },
  { icon: Sprout, title: "Protection de l'environnement", desc: "Sensibiliser les communautés à la protection de l'environnement et promouvoir les pratiques de développement durable.", img: "/images/environment-tree.jpg", color: "from-green-600" },
  { icon: Handshake, title: "Développement communautaire", desc: "Soutenir les initiatives locales de développement, renforcer les capacités communautaires et encourager la solidarité.", img: "/images/join-bg.jpg", color: "from-cyan-600" },
];

export default function DomainesPage() {
  return (
    <>
      <PageHero
        kicker="Nos domaines"
        title="Domaines d'intervention"
        subtitle="CIPBG Afrique intervient dans dix domaines clés pour bâtir des sociétés pacifiques, responsables et transparentes."
        image="/images/hero-bg.jpg"
      />

      {/* Domains with full images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {domains.map((d, i) => (
            <Reveal key={d.title} delay={Math.min(i * 40, 240)}>
              <div
                className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[250px] overflow-hidden group">
                  <Image src={d.img} alt={d.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${d.color}/60 to-transparent`} />
                  <div className="absolute bottom-6 left-6">
                    <d.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-slate-50">
                  <h3 className="text-2xl font-bold text-primary mb-4">{d.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{d.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
