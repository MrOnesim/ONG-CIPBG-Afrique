import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
  crumb?: string;
};

export function PageHero({ kicker, title, subtitle, image, crumb }: PageHeroProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Image src={image} alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/80 to-primary-dark/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-blue-200 mb-5" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Accueil
          </Link>
          <span className="text-white/40">›</span>
          <span className="text-white/90">{crumb || title}</span>
        </nav>
        <span className="section-kicker text-white/90">{kicker}</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-white drop-shadow-lg">{title}</h1>
        <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
