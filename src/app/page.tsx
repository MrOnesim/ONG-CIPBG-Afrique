import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { articles, projects, activities } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
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
  Eye,
  Target,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ClipboardList,
  Newspaper,
} from "lucide-react";

const domains = [
  { icon: Bird, title: "Paix et cohésion sociale", desc: "Promouvoir la paix et le vivre-ensemble entre les communautés.", img: "/images/peace-conference.jpg" },
  { icon: Scale, title: "Bonne gouvernance", desc: "Encourager la transparence et la responsabilité dans la gestion publique.", img: "/images/governance-workshop.jpg" },
  { icon: Landmark, title: "Démocratie et citoyenneté", desc: "Renforcer la participation citoyenne et la culture démocratique.", img: "/images/community-meeting.jpg" },
  { icon: SearchCheck, title: "Transparence et lutte contre la corruption", desc: "Combattre la corruption et promouvoir l'intégrité.", img: "/images/governance-workshop.jpg" },
  { icon: GraduationCap, title: "Éducation des filles", desc: "Favoriser l'accès à l'éducation pour les filles en milieu urbain et rural.", img: "/images/education-girls.jpg" },
  { icon: Briefcase, title: "Emploi des jeunes", desc: "Promouvoir l'autonomisation et l'insertion professionnelle des jeunes.", img: "/images/youth-training.jpg" },
  { icon: ShieldCheck, title: "Prévention de l'extrémisme", desc: "Sensibiliser aux risques de l'extrémisme violent.", img: "/images/peace-conference.jpg" },
  { icon: Vote, title: "Prévention des violences électorales", desc: "Promouvoir des élections pacifiques et non-violentes.", img: "/images/community-meeting.jpg" },
  { icon: Sprout, title: "Protection de l'environnement", desc: "Sensibiliser à la protection de notre environnement.", img: "/images/environment-tree.jpg" },
  { icon: Handshake, title: "Développement communautaire", desc: "Soutenir les initiatives de développement local.", img: "/images/join-bg.jpg" },
];

const stats = [
  { value: "9+", label: "Domaines d'intervention" },
  { value: "2023", label: "Année de création" },
  { value: "100+", label: "Bénéficiaires" },
  { value: "10+", label: "Partenaires" },
];

const testimonials = [
  {
    quote: "CIPBG Afrique nous a permis de comprendre nos droits et notre rôle dans la démocratie locale. Nous sommes désormais des citoyens actifs.",
    name: "Adélaïde K.",
    role: "Participante, Atelier citoyenneté",
    img: "/images/testimonial-1.jpg",
  },
  {
    quote: "Grâce aux formations de CIPBG Afrique, j'ai acquis les compétences pour lancer mon propre projet. L'avenir appartient à la jeunesse engagée.",
    name: "Bernardin A.",
    role: "Bénéficiaire, Programme jeunesse",
    img: "/images/testimonial-2.jpg",
  },
];

const galleryPreview = [
  { src: "/images/peace-conference.jpg", alt: "Conférence sur la paix" },
  { src: "/images/education-girls.jpg", alt: "Éducation des filles" },
  { src: "/images/community-meeting.jpg", alt: "Réunion communautaire" },
  { src: "/images/environment-tree.jpg", alt: "Protection de l'environnement" },
  { src: "/images/youth-training.jpg", alt: "Formation des jeunes" },
  { src: "/images/governance-workshop.jpg", alt: "Atelier bonne gouvernance" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let recentArticles: typeof articles.$inferSelect[] = [];
  let recentProjects: typeof projects.$inferSelect[] = [];
  let recentActivities: typeof activities.$inferSelect[] = [];

  try {
    recentArticles = await db.select().from(articles).where(eq(articles.published, true)).orderBy(desc(articles.createdAt)).limit(3);
    recentProjects = await db.select().from(projects).where(eq(projects.published, true)).orderBy(desc(projects.createdAt)).limit(3);
    recentActivities = await db.select().from(activities).where(eq(activities.published, true)).orderBy(desc(activities.createdAt)).limit(3);
  } catch {
    // tables may not exist yet
  }

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Afrique pacifique"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/75 to-primary-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6 hero-logo">
            <div className="mx-auto w-fit rounded-2xl bg-white/95 backdrop-blur p-3 shadow-2xl ring-1 ring-white/40">
              <Image src="/images/logo.png" alt="Logo CIPBG" width={150} height={100} priority className="h-24 w-auto" />
            </div>
          </div>
          <span className="hero-logo inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full glass text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
            ONG enregistrée au Bénin · Depuis 2023
          </span>
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Promouvoir la paix et la <span className="text-gradient">bonne gouvernance</span> en Afrique
          </h1>
          <p className="hero-sub text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ensemble, construisons des sociétés plus pacifiques, responsables, transparentes et inclusives.
          </p>
          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <Link
              href="/domaines"
              className="bg-accent hover:bg-accent-light text-white px-8 py-3.5 rounded-full font-bold text-lg transition-colors shadow-xl shadow-accent/30 btn-lift"
            >
              Découvrir nos actions
            </Link>
            <Link
              href="/contact"
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-colors border border-white/40 backdrop-blur-md btn-lift"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ PRESENTATION WITH IMAGE ══════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="section-kicker">Qui sommes-nous</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
                CIPBG Afrique
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Le <strong>Cercle International pour la Paix et la Bonne Gouvernance en Afrique</strong> (CIPBG Afrique)
                est une organisation non gouvernementale enregistrée au Bénin sous le numéro 2023/001/MISP/DC/SGM/DAIC/SACC/SA.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Basée à Abomey-Calavi dans le département de l&apos;Atlantique, notre organisation œuvre pour la promotion
                de la paix, de la bonne gouvernance, de la citoyenneté, de la démocratie et du développement durable
                au Bénin et dans la sous-région africaine.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary/5 rounded-xl p-4 text-center hover:bg-primary/10 transition-colors">
                  <Bird className="w-7 h-7 mx-auto mb-2 text-primary" />
                  <span className="text-xs font-semibold text-primary">Paix</span>
                </div>
                <div className="bg-secondary/5 rounded-xl p-4 text-center hover:bg-secondary/10 transition-colors">
                  <Scale className="w-7 h-7 mx-auto mb-2 text-secondary" />
                  <span className="text-xs font-semibold text-secondary">Gouvernance</span>
                </div>
                <div className="bg-accent/5 rounded-xl p-4 text-center hover:bg-accent/10 transition-colors">
                  <Landmark className="w-7 h-7 mx-auto mb-2 text-accent" />
                  <span className="text-xs font-semibold text-accent">Démocratie</span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
                  <Sprout className="w-7 h-7 mx-auto mb-2 text-green-700" />
                  <span className="text-xs font-semibold text-green-700">Développement</span>
                </div>
              </div>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors group"
              >
                En savoir plus
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-bg.jpg"
                    alt="Communauté CIPBG"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating accent image */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden md:block animate-float">
                  <Image src="/images/peace-conference.jpg" alt="Conférence" fill className="object-cover" />
                </div>
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden md:block animate-float" style={{ animationDelay: "2s" }}>
                  <Image src="/images/education-girls.jpg" alt="Éducation" fill className="object-cover" />
                </div>
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-primary">Abomey-Calavi, Bénin</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ VISION & MISSION (with images) ══════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-14">
            <span className="section-kicker">Notre raison d&apos;être</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Vision & Mission</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md group h-full">
                <div className="relative h-56 overflow-hidden">
                  <Image src="/images/community-meeting.jpg" alt="Vision CIPBG" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Notre Vision</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Construire une Afrique où la paix, la bonne gouvernance, la démocratie, la participation citoyenne
                    et le développement durable constituent les bases du progrès social.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md group h-full">
                <div className="relative h-56 overflow-hidden">
                  <Image src="/images/governance-workshop.jpg" alt="Mission CIPBG" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Notre Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Contribuer à la promotion de la paix et de la bonne gouvernance à travers la sensibilisation,
                    la formation, l&apos;éducation citoyenne et la mise en œuvre d&apos;initiatives favorisant une société
                    non violente et responsable.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ DOMAINES WITH IMAGES ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-14">
            <span className="section-kicker">Nos actions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
              Domaines d&apos;intervention
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              CIPBG Afrique intervient dans dix domaines stratégiques pour bâtir des sociétés pacifiques et responsables.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {domains.map((d, i) => (
              <Reveal key={d.title} delay={Math.min(i * 60, 300)}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 h-full hover:-translate-y-1">
                  <div className="relative h-32 overflow-hidden">
                    <Image src={d.img} alt={d.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <d.icon className="absolute bottom-3 left-3 w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-primary mb-1 text-sm leading-tight">{d.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Link href="/domaines" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-light transition-colors shadow-md shadow-primary/20 btn-lift">
              Voir tous nos domaines
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ STATS WITH BACKGROUND IMAGE ══════════ */}
      <section className="py-20 relative overflow-hidden">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Chiffres clés</h2>
            <p className="text-blue-200 mt-2">Notre impact en quelques chiffres</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="glass rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-colors">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    <CountUp value={s.value} />
                  </div>
                  <div className="text-blue-200 text-sm font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PHOTO SHOWCASE STRIP ══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <span className="section-kicker">En images</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Nos actions sur le terrain</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Découvrez en images les activités et projets menés par CIPBG Afrique au Bénin et dans la sous-région.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryPreview.map((img, i) => (
              <Reveal key={i} delay={i * 70}>
                <Link
                  href="/galerie"
                  className={`relative overflow-hidden rounded-2xl group shadow-md block ${i === 0 ? "md:row-span-2 md:col-span-1" : ""}`}
                >
                  <div className={`relative ${i === 0 ? "h-64 md:h-full" : "h-48 md:h-56"}`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-bold">{img.alt}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Link href="/galerie" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors group">
              Voir toute la galerie
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ RECENT PROJECTS ══════════ */}
      {recentProjects.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-kicker">Nos réalisations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Projets récents</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentProjects.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="relative h-52 overflow-hidden">
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <ClipboardList className="w-12 h-12 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-accent uppercase tracking-wide">{p.category}</span>
                    <h3 className="font-bold text-primary mt-1 mb-2 text-lg">{p.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3">{p.description}</p>
                    <span className={`mt-3 inline-block text-xs px-3 py-1 rounded-full font-medium ${
                      p.status === "termine" ? "bg-green-100 text-green-700" :
                      p.status === "a_venir" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status === "termine" ? "Terminé" : p.status === "a_venir" ? "À venir" : "En cours"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/projets" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors group">
                Voir tous les projets
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ RECENT ACTIVITIES ══════════ */}
      {recentActivities.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-kicker">En action</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Activités récentes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentActivities.map((a) => (
                <div key={a.id} className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  {a.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image src={a.imageUrl} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wide">{a.type}</span>
                    <h3 className="font-bold text-primary mt-1 mb-2 text-lg">{a.title}</h3>
                    {a.date && <p className="text-xs text-slate-400 mb-2"><Calendar className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{new Date(a.date).toLocaleDateString("fr-FR")}</p>}
                    {a.location && <p className="text-xs text-slate-400 mb-2"><MapPin className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{a.location}</p>}
                    <p className="text-sm text-slate-600 line-clamp-3">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/activites" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors group">
                Voir toutes les activités
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ RECENT ARTICLES ══════════ */}
      {recentArticles.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-kicker">Restez informé</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Actualités</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentArticles.map((a) => (
                <Link key={a.id} href={`/actualites/${a.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block group hover:-translate-y-1">
                  {a.imageUrl ? (
                    <div className="h-52 relative overflow-hidden">
                      <Image src={a.imageUrl} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-52 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-bold text-accent uppercase tracking-wide">{a.category}</span>
                    <h3 className="font-bold text-primary mt-1 mb-2 text-lg group-hover:text-primary-light transition-colors">{a.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{new Date(a.createdAt).toLocaleDateString("fr-FR")}</p>
                    <p className="text-sm text-slate-600 line-clamp-3">{a.excerpt || a.content.substring(0, 150)}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/actualites" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors group">
                Voir toutes les actualités
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center mb-14">
            <span className="section-kicker">Témoignages</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Ils parlent de nous</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row h-full">
                  <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent md:bg-gradient-to-r" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <svg className="w-8 h-8 text-accent/40 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" /></svg>
                    <p className="text-slate-600 italic leading-relaxed mb-4">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{t.name}</p>
                        <p className="text-sm text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA PARTNERSHIP (with image background) ══════════ */}
      <section className="py-20 relative overflow-hidden">
        <Image src="/images/join-bg.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-secondary/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <Reveal>
            <span className="section-kicker text-white">Ensemble</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">
              Devenez partenaire de CIPBG Afrique
            </h2>
            <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
              Ensemble, nous pouvons construire un avenir plus pacifique et responsable pour l&apos;Afrique.
              Rejoignez notre réseau de partenaires engagés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rejoindre"
                className="bg-white text-secondary px-8 py-3.5 rounded-full font-bold hover:bg-green-50 transition-colors shadow-xl btn-lift"
              >
                Rejoindre l&apos;ONG
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors btn-lift"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CONTACT PREVIEW ══════════ */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="section-kicker">Restez connecté</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">Contactez-nous</h2>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><MapPin className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <p>Abomey-Calavi, Atlantique, Bénin</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><Phone className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <p>+229 01 96 16 94 76 / +229 01 95 81 57 26</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><Mail className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <a href="mailto:ongcipbgafrique@gmail.com" className="text-primary hover:underline">ongcipbgafrique@gmail.com</a>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-light transition-colors shadow-md shadow-primary/20 btn-lift"
              >
                Tous nos contacts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/peace-conference.jpg" alt="Conférence CIPBG" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
