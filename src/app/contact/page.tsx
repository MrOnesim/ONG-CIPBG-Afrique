import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez CIPBG Afrique. Formulaire de contact, téléphones, email et adresse.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contactez-nous"
        title="Contact"
        subtitle="Nous sommes à votre écoute. N'hésitez pas à nous écrire, appeler ou passer nous voir à Abomey-Calavi."
        image="/images/community-meeting.jpg"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <Reveal>
              <h2 className="text-2xl font-bold text-primary mb-6">ONG CIPBG Afrique</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><MapPin className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Adresse</h3>
                    <p className="text-slate-600">Département de l&apos;Atlantique<br />Commune d&apos;Abomey-Calavi, Bénin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><Phone className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Téléphone</h3>
                    <p className="text-slate-600">+229 01 96 16 94 76<br />+229 01 95 81 57 26</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><Mail className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <a href="mailto:ongcipbgafrique@gmail.com" className="text-primary hover:underline">
                      ongcipbgafrique@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all"><Clock className="w-5 h-5 text-primary group-hover:text-white" /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Horaires</h3>
                    <p className="text-slate-600">Lundi – Vendredi : 8h00 – 17h00<br />Samedi : 9h00 – 13h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:scale-105 transition-all"><MessageCircle className="w-5 h-5 text-green-600 group-hover:text-white" /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">WhatsApp</h3>
                    <a href="https://wa.me/2290196169476" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                      +229 01 96 16 94 76
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8">
                <h3 className="font-semibold text-slate-800 mb-3">Réseaux sociaux</h3>
                <div className="flex gap-3 flex-wrap">
                  {["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"].map((s) => (
                    <a key={s} href="#" className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* Image instead of map */}
              <div className="mt-8 relative h-56 rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/about-bg.jpg" alt="Abomey-Calavi, Bénin" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <p className="font-bold"><MapPin className="w-4 h-4 inline-block mr-1 -mt-0.5 text-accent" />Abomey-Calavi</p>
                  <p className="text-sm text-blue-200">Atlantique, Bénin</p>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={120}>
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-primary mb-6">Envoyez-nous un message</h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
