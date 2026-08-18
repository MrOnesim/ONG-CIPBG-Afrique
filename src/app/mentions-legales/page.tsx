import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site web de l'ONG CIPBG Afrique.",
};

export default function MentionsPage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 prose">
        <h1 className="text-3xl font-bold text-primary mb-8">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <strong>ONG CIPBG Afrique</strong><br />
          Cercle International pour la Paix et la Bonne Gouvernance en Afrique<br />
          Département de l&apos;Atlantique / Commune d&apos;Abomey-Calavi, Bénin<br />
          Enregistrement : 2023/001/MISP/DC/SGM/DAIC/SACC/SA<br />
          Email : ongcipbgafrique@gmail.com<br />
          Téléphones : +229 01 96 16 94 76 / +229 01 95 81 57 26
        </p>

        <h2>Directeur de la publication</h2>
        <p>Le responsable de l&apos;ONG CIPBG Afrique.</p>

        <h2>Hébergement</h2>
        <p>Le site est hébergé sur une infrastructure cloud sécurisée.</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété
          de l&apos;ONG CIPBG Afrique ou de ses partenaires. Toute reproduction, représentation
          ou diffusion est interdite sans autorisation préalable.
        </p>

        <h2>Limitation de responsabilité</h2>
        <p>
          L&apos;ONG CIPBG Afrique s&apos;efforce de maintenir à jour et exactes les informations
          diffusées sur ce site. Toutefois, elle ne saurait être tenue pour responsable des
          omissions, inexactitudes ou défauts de mise à jour.
        </p>
      </div>
    </section>
  );
}
