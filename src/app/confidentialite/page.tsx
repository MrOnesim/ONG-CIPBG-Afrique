import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de l'ONG CIPBG Afrique.",
};

export default function ConfidentialitePage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 prose">
        <h1 className="text-3xl font-bold text-primary mb-8">Politique de confidentialité</h1>

        <h2>Collecte des données</h2>
        <p>
          CIPBG Afrique collecte des données personnelles uniquement dans le cadre de
          l&apos;utilisation des formulaires de contact, de candidature et d&apos;inscription
          à la newsletter. Les données collectées peuvent inclure : nom, prénom, email,
          téléphone, ville, profession et motivation.
        </p>

        <h2>Utilisation des données</h2>
        <p>
          Les données collectées sont utilisées exclusivement pour répondre à vos demandes,
          traiter vos candidatures et vous tenir informé des activités de l&apos;ONG.
          Elles ne sont jamais vendues ou transmises à des tiers à des fins commerciales.
        </p>

        <h2>Conservation des données</h2>
        <p>
          Les données personnelles sont conservées pour la durée nécessaire au traitement
          de votre demande et conformément aux obligations légales en vigueur.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès,
          de rectification, de suppression et d&apos;opposition sur vos données personnelles.
          Pour exercer ces droits, contactez-nous à : ongcipbgafrique@gmail.com
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site utilise des cookies techniques nécessaires à son bon fonctionnement.
          Aucun cookie publicitaire n&apos;est utilisé.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative à la protection de vos données,
          contactez-nous à ongcipbgafrique@gmail.com.
        </p>
      </div>
    </section>
  );
}
