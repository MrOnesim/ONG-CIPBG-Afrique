"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Accueil", href: "/" },
  {
    label: "À propos",
    href: "/a-propos",
    children: [
      { label: "Qui sommes-nous ?", href: "/a-propos" },
      { label: "Notre vision & mission", href: "/a-propos#vision" },
      { label: "Nos valeurs", href: "/a-propos#valeurs" },
      { label: "Nos objectifs", href: "/objectifs" },
    ],
  },
  {
    label: "Nos actions",
    href: "/domaines",
    children: [
      { label: "Domaines d'intervention", href: "/domaines" },
      { label: "Projets", href: "/projets" },
      { label: "Activités", href: "/activites" },
    ],
  },
  { label: "Actualités", href: "/actualites" },
  {
    label: "Ressources",
    href: "/documents",
    children: [
      { label: "Documents & Rapports", href: "/documents" },
      { label: "Galerie", href: "/galerie" },
    ],
  },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Rejoindre", href: "/rejoindre" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4.5" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-slate-900/5" : "shadow-md"}`}>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="mailto:ongcipbgafrique@gmail.com" className="flex items-center gap-1.5 hover:text-accent-light transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              ongcipbgafrique@gmail.com
            </a>
            <a href="tel:+2290196169476" className="flex items-center gap-1.5 hover:text-accent-light transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +229 01 96 16 94 76
            </a>
          </div>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/logo.png"
              alt="Logo CIPBG Afrique"
              width={66}
              height={44}
              priority
              className="h-11 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            <span className="leading-tight hidden sm:block">
              <span className="block font-extrabold text-primary text-lg tracking-tight">CIPBG Afrique</span>
              <span className="block text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Paix & Bonne gouvernance
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-[13.5px] font-semibold rounded-lg transition-colors inline-flex items-center ${
                    isActive(item.href)
                      ? "text-primary bg-primary/5"
                      : "text-slate-600 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <svg className={`w-3 h-3 ml-1 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                    </svg>
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 py-2 min-w-[240px] overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-primary hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-accent-light transition-colors shadow-md shadow-accent/20 btn-lift"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Soutenir
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 top-0 h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "top-2 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-4 h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "top-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out bg-white border-t border-slate-100 ${mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"}`}>
        <nav className="px-4 py-3">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-slate-50 last:border-0">
              <Link
                href={item.href}
                className={`block py-3 text-sm font-semibold ${isActive(item.href) ? "text-primary" : "text-slate-700"}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block py-2 pl-4 text-sm text-slate-500 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  — {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-4 block text-center bg-accent text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-accent-light transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Soutenir notre action
          </Link>
        </nav>
      </div>
    </header>
  );
}
