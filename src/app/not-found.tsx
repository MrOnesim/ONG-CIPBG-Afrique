import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-[70vh] flex items-center overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="section-kicker inline-block mb-6">Erreur 404</span>
        <h1 className="font-heading text-6xl md:text-8xl font-extrabold text-gradient leading-none mb-6">
          404
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-primary mb-3">
          Cette page s&apos;est égarée
        </p>
        <p className="text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil pour découvrir nos actions pour la paix et la
          bonne gouvernance en Afrique.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-lift bg-primary text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
            Retour à l&apos;accueil
          </Link>
          <Link href="/contact" className="btn-lift bg-white text-primary px-8 py-3.5 rounded-full font-semibold border-2 border-primary/20 hover:border-primary/50 transition-colors">
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
