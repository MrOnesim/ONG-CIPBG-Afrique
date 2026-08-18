import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Bird, Handshake, SearchCheck, Scale, Globe, Heart, Target, Sprout, Building2, Calendar, MapPin, Eye as EyeIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez CIPBG Afrique, notre vision, mission, valeurs et objectifs pour la paix et la bonne gouvernance en Afrique.",
};

const values = [
  { icon: Bird, title: "Paix", desc: "La paix est au cœur de notre engagement.", img: "/images/peace-conference.jpg" },
  { icon: Handshake, title: "Solidarité", desc: "Nous croyons en la force de la solidarité entre les peuples.", img: "/images/join-bg.jpg" },
  { icon: SearchCheck, title: "Transparence", desc: "La transparence guide toutes nos actions et notre gouvernance.", img: "/images/governance-workshop.jpg" },
  { icon: Scale, title: "Justice", desc: "Nous œuvrons pour une société juste et équitable.", img: "/images/community-meeting.jpg" },
  { icon: Globe, title: "Inclusion", desc: "Chacun a sa place dans la construction d'un avenir meilleur.", img: "/images/education-girls.jpg" },
  { icon: Heart, title: "Engagement", desc: "Nous nous engageons avec détermination pour nos causes.", img: "/images/youth-training.jpg" },
  { icon: Target, title: "Responsabilité", desc: "Nous assumons la responsabilité de nos actions et de leur impact.", img: "/images/governance-workshop.jpg" },
  { icon: Sprout, title: "Durabilité", desc: "Nos actions visent un impact durable pour les générations futures.", img: "/images/environment-tree.jpg" },
];

const timeline = [
  { year: "2023", title: "Création de CIPBG Afrique", desc: "Enregistrement officiel sous le numéro 2023/001/MISP/DC/SGM/DAIC/SACC/SA au Bénin." },
  { year: "2023", title: "Lancement des premières actions", desc: "Mise en place des programmes de sensibilisation à la paix et à la bonne gouvernance." },
  { year: "2024", title: "Expansion des activités", desc: "Développement des partenariats et extension des programmes dans la sous-région." },
  { year: "2025", title: "Renforcement institutionnel", desc: "Consolidation des structures et développement de nouveaux projets." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="À propos"
        title="Qui sommes-nous ?"
        subtitle="Le Cercle International pour la Paix et la Bonne Gouvernance en Afrique : une ONG engagée pour un avenir pacifique, transparent et inclusif."
        image="/images/about-bg.jpg"
      />

      {/* Presentation with images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="text-3xl font-bold text-primary mb-6">Présentation de CIPBG Afrique</h2>
              <div className="text-slate-600 space-y-4">
                <p>
                  L&apos;ONG <strong>CIPBG Afrique</strong> (Cercle International pour la Paix et la Bonne Gouvernance en Afrique)
                  est une organisation non gouvernementale créée en 2023, enregistrée sous le numéro
                  <strong> 2023/001/MISP/DC/SGM/DAIC/SACC/SA</strong>.
                </p>
                <p>
                  Basée à <strong>Abomey-Calavi</strong>, dans le département de l&apos;Atlantique au Bénin, CIPBG Afrique
                  œuvre pour la promotion de la paix, de la bonne gouvernance, de la citoyenneté, de la démocratie
                  et du développement durable au Bénin et dans la sous-région africaine.
                </p>
                <p>
                  L&apos;organisation mène ses activités à travers la sensibilisation, la formation, l&apos;éducation citoyenne,
                  la participation communautaire et la mise en œuvre d&apos;initiatives favorisant une société non violente
                  et responsable.
                </p>
              </div>

              <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><Building2 className="w-5 h-5 text-primary shrink-0" /><div><strong className="block text-primary">Statut</strong>ONG enregistrée</div></div>
                  <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary shrink-0" /><div><strong className="block text-primary">Création</strong>2023</div></div>
                  <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary shrink-0" /><div><strong className="block text-primary">Siège</strong>Abomey-Calavi, Bénin</div></div>
                  <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary shrink-0" /><div><strong className="block text-primary">Zone</strong>Bénin & sous-région</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/peace-conference.jpg" alt="CIPBG en action" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-4 w-40 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden md:block animate-float">
                  <Image src="/images/community-meeting.jpg" alt="Réunion communautaire" fill className="object-cover" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mosaic of images */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-3 h-48 md:h-64">
            <div className="relative rounded-xl overflow-hidden col-span-2">
              <Image src="/images/education-girls.jpg" alt="Éducation des filles" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/environment-tree.jpg" alt="Environnement" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/youth-training.jpg" alt="Formation jeunes" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission with images */}
      <section id="vision" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-kicker">Notre direction</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Vision & Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md group">
              <div className="relative h-60 overflow-hidden">
                <Image src="/images/community-meeting.jpg" alt="Vision" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"><EyeIcon className="w-7 h-7 text-white" /></div>
                    <h3 className="text-2xl font-bold text-white">Notre Vision</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed text-lg">
                  Construire une Afrique où la paix, la bonne gouvernance, la démocratie, la participation citoyenne
                  et le développement durable constituent les bases du progrès social.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md group">
              <div className="relative h-60 overflow-hidden">
                <Image src="/images/governance-workshop.jpg" alt="Mission" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"><Target className="w-7 h-7 text-white" /></div>
                    <h3 className="text-2xl font-bold text-white">Notre Mission</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed text-lg">
                  Contribuer à la promotion de la paix et de la bonne gouvernance à travers la sensibilisation,
                  la formation, l&apos;éducation citoyenne, la participation communautaire et la mise en œuvre
                  d&apos;initiatives favorisant une société non violente et responsable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs with images */}
      <section id="valeurs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-kicker">Ce qui nous guide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Nos Valeurs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 70, 280)}>
                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-white border border-slate-100 h-full hover:-translate-y-1">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={v.img} alt={v.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <v.icon className="absolute bottom-3 left-4 w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-primary mb-2 text-lg">{v.title}</h3>
                    <p className="text-sm text-slate-600">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / History */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-kicker">Notre parcours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Historique</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            {timeline.map((item, i) => (
              <div key={i} className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`} />
                <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg border-4 border-white">
                  {item.year.slice(-2)}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
                  <span className="text-accent font-bold text-sm">{item.year}</span>
                  <h3 className="font-bold text-primary mt-1 text-lg">{item.title}</h3>
                  <p className="text-slate-600 text-sm mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisation with image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/join-bg.jpg" alt="Équipe CIPBG" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Organisation et fonctionnement</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                CIPBG Afrique est dirigée par une équipe de professionnels et de bénévoles engagés pour la paix
                et la bonne gouvernance. L&apos;organisation fonctionne de manière démocratique et transparente,
                conformément à ses statuts et à son règlement intérieur.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                L&apos;ONG collabore avec les institutions publiques, les organisations de la société civile,
                les partenaires internationaux et les communautés locales pour mener à bien ses projets
                et atteindre ses objectifs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/objectifs" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors">
                  Nos objectifs
                </Link>
                <Link href="/domaines" className="bg-slate-100 text-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
                  Nos domaines
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
