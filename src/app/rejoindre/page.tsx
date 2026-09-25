import type { Metadata } from "next";
import Image from "next/image";
import { JoinForm } from "@/components/JoinForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Handshake, UserRound, Building2, GraduationCap, Star, Bird, Scale, Landmark, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Rejoindre l'ONG",
  description: "Rejoignez CIPBG Afrique en tant que bénévole, membre, partenaire, expert ou ambassadeur.",
};

const participationTypes = [
  { icon: Handshake, title: "Bénévole", desc: "Participez à nos activités sur le terrain." },
  { icon: UserRound, title: "Membre", desc: "Rejoignez notre organisation en tant que membre actif." },
  { icon: Building2, title: "Partenaire", desc: "Collaborez avec nous sur des projets communs." },
  { icon: GraduationCap, title: "Expert", desc: "Apportez votre expertise technique à nos programmes." },
  { icon: Star, title: "Ambassadeur", desc: "Représentez CIPBG Afrique dans votre communauté." },
];

export default function RejoindrePage() {
  return (
    <>
      <PageHero
        kicker="Engagement"
        title="Rejoindre CIPBG Afrique"
        subtitle="Participez à la construction d'une Afrique plus pacifique, transparente et responsable."
        image="/images/join-bg.jpg"
      />

      {/* Participation types */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-10">
            <span className="section-kicker">Votre place</span>
            <h2 className="text-2xl font-bold text-primary mt-2">Comment participer ?</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {participationTypes.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-bold text-primary text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Pourquoi nous rejoindre ?</h2>
              <div className="space-y-4 text-slate-600 mb-8">
                <p>En rejoignant CIPBG Afrique, vous contribuez activement à :</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><Bird className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>La promotion de la paix et de la cohésion sociale</span></li>
                  <li className="flex items-start gap-3"><Scale className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>Le renforcement de la bonne gouvernance</span></li>
                  <li className="flex items-start gap-3"><Landmark className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>Le développement de la démocratie et de la citoyenneté</span></li>
                  <li className="flex items-start gap-3"><GraduationCap className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>L&apos;éducation et l&apos;autonomisation</span></li>
                  <li className="flex items-start gap-3"><Sprout className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>La protection de l&apos;environnement</span></li>
                </ul>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/paix-mains.jpg" alt="Conférence" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/education-classe.jpg" alt="Éducation" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/environnement-foret.jpg" alt="Environnement" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                  <Image src="/images/emploi-digitale.jpg" alt="Formation" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-primary mb-6">Formulaire de candidature</h2>
                <JoinForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
