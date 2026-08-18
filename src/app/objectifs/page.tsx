import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Bird, SearchCheck, Landmark, Hand, ShieldCheck, Vote, Users, GraduationCap, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos objectifs",
  description: "Les objectifs de CIPBG Afrique pour la paix, la bonne gouvernance, la démocratie et le développement durable en Afrique.",
};

const objectives = [
  { num: 1, title: "Paix et bonne gouvernance", desc: "Promouvoir la paix et la bonne gouvernance au Bénin et dans la sous-région à travers des initiatives de sensibilisation.", icon: Bird, img: "/images/peace-conference.jpg" },
  { num: 2, title: "Corruption et transparence", desc: "Organiser des initiatives, conférences ou colloques portant sur la lutte contre la corruption et la promotion de la transparence.", icon: SearchCheck, img: "/images/governance-workshop.jpg" },
  { num: 3, title: "État de droit et participation", desc: "Organiser des ateliers de formation sur l'État de droit, la participation citoyenne et la démocratie.", icon: Landmark, img: "/images/community-meeting.jpg" },
  { num: 4, title: "Non-violence et responsabilité", desc: "Sensibiliser et impliquer les citoyens dans la culture de la non-violence, de la responsabilité et de la paix.", icon: Hand, img: "/images/peace-conference.jpg" },
  { num: 5, title: "Extrémisme violent et emploi des jeunes", desc: "Sensibiliser les populations sur les risques liés à l'extrémisme violent et promouvoir les initiatives en faveur de l'emploi des jeunes.", icon: ShieldCheck, img: "/images/youth-training.jpg" },
  { num: 6, title: "Prévention des violences électorales", desc: "Organiser des activités avant, pendant et après les élections afin de promouvoir une culture de non-violence.", icon: Vote, img: "/images/community-meeting.jpg" },
  { num: 7, title: "Participation citoyenne", desc: "Encourager la participation citoyenne et le développement de la démocratie.", icon: Users, img: "/images/governance-workshop.jpg" },
  { num: 8, title: "Éducation des filles", desc: "Promouvoir l'éducation des filles en milieu urbain et rural.", icon: GraduationCap, img: "/images/education-girls.jpg" },
  { num: 9, title: "Protection de l'environnement", desc: "Sensibiliser les populations sur l'importance de la protection de l'environnement.", icon: Sprout, img: "/images/environment-tree.jpg" },
];

export default function ObjectivesPage() {
  return (
    <>
      <PageHero
        kicker="Notre engagement"
        title="Nos Objectifs"
        subtitle="Neuf objectifs majeurs guident les actions de CIPBG Afrique pour contribuer à un avenir meilleur."
        image="/images/governance-workshop.jpg"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((obj, i) => (
              <Reveal key={obj.num} delay={Math.min(i * 60, 300)}>
                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 h-full hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={obj.img} alt={obj.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Objectif {obj.num}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <obj.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">{obj.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
