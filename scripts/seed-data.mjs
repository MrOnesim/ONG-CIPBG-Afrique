import { config } from "dotenv";
import pg from "pg";
import { writeFileSync, mkdirSync } from "node:fs";
import { makePdf } from "./placeholder-pdf.mjs";

config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function iso(daysAgo) {
  return new Date(Date.now() - daysAgo * 86400000).toISOString();
}

const articles = [
  {
    title: "CIPBG Afrique lance sa campagne nationale de sensibilisation à la paix",
    slug: "campagne-paix-2026",
    content:
      "La Coordination Internationale des Patriotes pour la Bonne Gouvernance (CIPBG) Afrique a officiellement lancé sa campagne nationale de sensibilisation à la paix et à la cohésion sociale.\n\nDurant trois mois, des équipes de volontaires iront à la rencontre des communautés des 12 départements du Bénin pour promouvoir le dialogue, la tolérance et la non-violence.\n\nCette initiative s'inscrit dans la vision de l'organisation : bâtir une Afrique paisible, solidaire et prospère, où chaque citoyen participe à la construction de l'intérêt général.",
    excerpt:
      "Une campagne nationale de trois mois pour promouvoir le dialogue, la tolérance et la non-violence dans les 12 départements du Bénin.",
    imageUrl: "/images/peace-conference.jpg",
    category: "Communiqués",
    author: "CIPBG Afrique",
    published: true,
    views: 128,
    createdAt: iso(2),
    updatedAt: iso(2),
  },
  {
    title: "Atelier de formation sur la bonne gouvernance à Cotonou",
    slug: "formation-bonne-gouvernance-cotonou",
    content:
      "La CIPBG Afrique a organisé un atelier de deux jours sur la bonne gouvernance et la redevabilité, réunissant des jeunes leaders, des représentants de la société civile et des cadres de l'administration publique.\n\nLes participants ont été formés aux principes de transparence, d'éthique et de gestion des ressources publiques.\n\nLes recommandations issues de cet atelier seront transmises aux autorités et serviront de base à nos prochaines actions de plaidoyer.",
    excerpt:
      "Un atelier de formation réunissant jeunes leaders et société civile autour des principes de transparence et d'éthique.",
    imageUrl: "/images/governance-workshop.jpg",
    category: "Événements",
    author: "CIPBG Afrique",
    published: true,
    views: 96,
    createdAt: iso(12),
    updatedAt: iso(12),
  },
  {
    title: "Programme d'appui à l'éducation des jeunes filles en milieu rural",
    slug: "appui-education-jeunes-filles",
    content:
      "Dans le cadre de sa mission de promotion de l'équité, la CIPBG Afrique lance un programme d'appui à l'éducation des jeunes filles en milieu rural.\n\nCe programme prévoit l'octroi de bourses scolaires, la fourniture de kits scolaires et la sensibilisation des familles sur l'importance de la scolarisation des filles.\n\nL'objectif est d'accompagner 200 jeunes filles sur trois ans dans les communes de l'Atlantique et du Zou.",
    excerpt:
      "Bourses scolaires, kits scolaires et sensibilisation des familles pour l'éducation des jeunes filles.",
    imageUrl: "/images/education-girls.jpg",
    category: "Programmes",
    author: "CIPBG Afrique",
    published: true,
    views: 154,
    createdAt: iso(20),
    updatedAt: iso(20),
  },
  {
    title: "Campagne de reboisement : 500 arbres plantés à Abomey-Calavi",
    slug: "reboisement-500-arbres",
    content:
      "Les volontaires de la CIPBG Afrique ont planté 500 arbres dans plusieurs quartiers d'Abomey-Calavi dans le cadre de notre engagement pour la protection de l'environnement.\n\nCette action s'inscrit dans notre axe de travail « Environnement & Développement durable » et contribue à la lutte contre le changement climatique.\n\nUn suivi de la croissance des plants est prévu avec l'appui des populations riveraines.",
    excerpt:
      "500 arbres plantés par les volontaires de la CIPBG pour la protection de l'environnement.",
    imageUrl: "/images/environment-tree.jpg",
    category: "Environnement",
    author: "CIPBG Afrique",
    published: true,
    views: 87,
    createdAt: iso(30),
    updatedAt: iso(30),
  },
];

const projects = [
  {
    name: "Projet Paix & Cohésion Sociale",
    slug: "paix-cohesion-sociale",
    description:
      "Renforcement du dialogue intercommunautaire et prévention des conflits dans les communes sensibles du Bénin.",
    objectives:
      "Organiser 20 séances de dialogue communautaire ; former 50 médiateurs de paix ; sensibiliser 5 000 citoyens à la non-violence.",
    zone: "Littoral, Atlantique, Ouémé",
    beneficiaries: "Jeunes, femmes, leaders communautaires",
    partners: "Mairies, ONG locales, autorités traditionnelles",
    startDate: iso(45),
    endDate: iso(-180),
    status: "en_cours",
    category: "paix",
    imageUrl: "/images/community-meeting.jpg",
    results: "12 séances de dialogue organisées, 30 médiateurs formés.",
    published: true,
    createdAt: iso(45),
    updatedAt: iso(5),
  },
  {
    name: "Autonomisation des femmes et des jeunes",
    slug: "autonomisation-femmes-jeunes",
    description:
      "Programme de formation professionnelle et d'accompagnement à l'entrepreneuriat des femmes et des jeunes.",
    objectives:
      "Former 150 jeunes aux métiers ; appuyer la création de 30 micro-entreprises ; créer des groupements d'épargne.",
    zone: "Atlantique, Zou",
    beneficiaries: "Femmes, jeunes sans emploi",
    partners: "Ministères sociaux, partenaires techniques",
    startDate: iso(30),
    endDate: iso(-300),
    status: "en_cours",
    category: "education",
    imageUrl: "/images/education-girls.jpg",
    results: "60 jeunes formés en 6 mois, 12 micro-entreprises créées.",
    published: true,
    createdAt: iso(30),
    updatedAt: iso(3),
  },
  {
    name: "Environnement & Développement durable",
    slug: "environnement-developpement-durable",
    description:
      "Actions de reboisement, de salubrité et de sensibilisation à la protection de l'environnement.",
    objectives:
      "Planter 2 000 arbres ; organiser des journées de salubrité ; sensibiliser les écoles.",
    zone: "Abomey-Calavi, Sèmè-Podji",
    beneficiaries: "Communautés locales, écoles",
    partners: "ONGS, services forestiers",
    startDate: iso(90),
    endDate: iso(-30),
    status: "termine",
    category: "environnement",
    imageUrl: "/images/environment-tree.jpg",
    results: "500 arbres plantés, 8 écoles sensibilisées.",
    published: true,
    createdAt: iso(90),
    updatedAt: iso(10),
  },
];

const activities = [
  {
    title: "Conférence-débat : La jeunesse, moteur de la bonne gouvernance",
    slug: "conference-jeunesse-bonne-gouvernance",
    description:
      "Une conférence-débat avec des experts et des jeunes leaders sur le rôle de la jeunesse dans la gouvernance participative.",
    type: "conference",
    date: iso(15),
    location: "Cotonou",
    imageUrl: "/images/peace-conference.jpg",
    results: "Plus de 200 participants, 15 recommandations formulées.",
    published: true,
    createdAt: iso(15),
    updatedAt: iso(15),
  },
  {
    title: "Formation des volontaires à la médiation sociale",
    slug: "formation-mediation-sociale",
    description:
      "Session de formation pratique des volontaires aux techniques de médiation et de résolution pacifique des conflits.",
    type: "formation",
    date: iso(8),
    location: "Abomey-Calavi",
    imageUrl: "/images/governance-workshop.jpg",
    results: "30 volontaires certifiés médiateurs de paix.",
    published: true,
    createdAt: iso(8),
    updatedAt: iso(8),
  },
  {
    title: "Journée citoyenne de salubrité et de reboisement",
    slug: "journee-salubrite-reboisement",
    description:
      "Grande mobilisation citoyenne pour le nettoyage des espaces publics et la plantation d'arbres dans le cadre du mois de l'environnement.",
    type: "environnement",
    date: iso(25),
    location: "Sèmè-Podji",
    imageUrl: "/images/environment-tree.jpg",
    results: "150 volontaires mobilisés, 300 arbres plantés.",
    published: true,
    createdAt: iso(25),
    updatedAt: iso(25),
  },
];

const partners = [
  {
    name: "Ministère de la Décentralisation",
    description: "Partenariat institutionnel pour le dialogue communautaire et la bonne gouvernance locale.",
    logoUrl: "/images/partners-meeting.jpg",
    website: "https://gouvernement.bj",
    partnershipType: "institutionnel",
    published: true,
    createdAt: iso(40),
  },
  {
    name: "Union des ONG du Bénin",
    description: "Coordination des actions de la société civile pour le développement durable.",
    logoUrl: "/images/partners-handshake.jpg",
    website: "https://gouvernement.bj",
    partnershipType: "societe_civile",
    published: true,
    createdAt: iso(35),
  },
  {
    name: "Fondation Paix & Solidarité",
    description: "Appui financier et technique aux programmes de cohésion sociale.",
    logoUrl: "/images/partners-meeting.jpg",
    website: "https://gouvernement.bj",
    partnershipType: "financier",
    published: true,
    createdAt: iso(28),
  },
];

const gallery = [
  { title: "Conférence sur la paix", album: "Événements", type: "photo", url: "/images/peace-conference.jpg", published: true, createdAt: iso(20) },
  { title: "Atelier de gouvernance", album: "Événements", type: "photo", url: "/images/governance-workshop.jpg", published: true, createdAt: iso(18) },
  { title: "Éducation des jeunes filles", album: "Programmes", type: "photo", url: "/images/education-girls.jpg", published: true, createdAt: iso(16) },
  { title: "Reboisement communautaire", album: "Environnement", type: "photo", url: "/images/environment-tree.jpg", published: true, createdAt: iso(14) },
  { title: "Rencontre communautaire", album: "Communautés", type: "photo", url: "/images/community-meeting.jpg", published: true, createdAt: iso(12) },
  { title: "Formation des jeunes", album: "Programmes", type: "photo", url: "/images/youth-training.jpg", published: true, createdAt: iso(10) },
  { title: "Partenariat institutionnel", album: "Partenariats", type: "photo", url: "/images/partners-handshake.jpg", published: true, createdAt: iso(8) },
  { title: "Réunion des partenaires", album: "Partenariats", type: "photo", url: "/images/partners-meeting.jpg", published: true, createdAt: iso(6) },
];

const docs = [
  { title: "Statuts de la CIPBG Afrique", category: "Statuts", fileUrl: "/documents/statuts-cipbg-afrique.pdf", description: "Statuts officiels de l'organisation, adoptés en assemblée constitutive.", published: true, createdAt: iso(60) },
  { title: "Rapport d'activités 2025", category: "Rapports", fileUrl: "/documents/rapport-activites-2025.pdf", description: "Bilan des activités, projets et résultats de l'exercice 2025.", published: true, createdAt: iso(30) },
  { title: "Brochure de présentation", category: "Brochures", fileUrl: "/documents/brochure-presentation.pdf", description: "Présentation de la vision, de la mission et des axes d'intervention.", published: true, createdAt: iso(20) },
];

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const t of ["articles", "projects", "activities", "partners", "gallery_items", "documents"]) {
      await client.query(`TRUNCATE ${t} RESTART IDENTITY CASCADE`);
    }

    mkdirSync("public/documents", { recursive: true });
    for (const d of docs) {
      const name = d.fileUrl.split("/").pop();
      writeFileSync(`public/documents/${name}`, makePdf(d.title));
    }
    console.log(`PDFs générés (${docs.length})`);

    for (const a of articles) await client.query(
      "INSERT INTO articles (title, slug, content, excerpt, image_url, category, author, published, views, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [a.title, a.slug, a.content, a.excerpt, a.imageUrl, a.category, a.author, a.published, a.views, a.createdAt, a.updatedAt]
    );
    console.log(`Articles : ${articles.length}`);

    for (const p of projects) await client.query(
      "INSERT INTO projects (name, slug, description, objectives, zone, beneficiaries, partners, start_date, end_date, status, category, image_url, results, published, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [p.name, p.slug, p.description, p.objectives, p.zone, p.beneficiaries, p.partners, p.startDate, p.endDate, p.status, p.category, p.imageUrl, p.results, p.published, p.createdAt, p.updatedAt]
    );
    console.log(`Projets : ${projects.length}`);

    for (const a of activities) await client.query(
      "INSERT INTO activities (title, slug, description, type, date, location, image_url, results, published, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [a.title, a.slug, a.description, a.type, a.date, a.location, a.imageUrl, a.results, a.published, a.createdAt, a.updatedAt]
    );
    console.log(`Activités : ${activities.length}`);

    for (const p of partners) await client.query(
      "INSERT INTO partners (name, description, logo_url, website, partnership_type, published, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [p.name, p.description, p.logoUrl, p.website, p.partnershipType, p.published, p.createdAt]
    );
    console.log(`Partenaires : ${partners.length}`);

    for (const g of gallery) await client.query(
      "INSERT INTO gallery_items (title, album, type, url, published, created_at) VALUES ($1,$2,$3,$4,$5,$6)",
      [g.title, g.album, g.type, g.url, g.published, g.createdAt]
    );
    console.log(`Galerie : ${gallery.length}`);

    for (const d of docs) await client.query(
      "INSERT INTO documents (title, category, file_url, description, published, created_at) VALUES ($1,$2,$3,$4,$5,$6)",
      [d.title, d.category, d.fileUrl, d.description, d.published, d.createdAt]
    );
    console.log(`Documents : ${docs.length}`);

    await client.query("COMMIT");
    console.log("Seed terminé avec succès.");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Erreur seed :", e);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
