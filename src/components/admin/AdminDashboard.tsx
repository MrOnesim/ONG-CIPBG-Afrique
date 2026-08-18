"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Newspaper,
  ClipboardList,
  Calendar,
  Handshake,
  MessageCircle,
  Users,
  Mail,
  MapPin,
  Briefcase,
  Target,
} from "lucide-react";

type Tab = "dashboard" | "articles" | "projects" | "activities" | "partners" | "messages" | "applications";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface DashboardStats {
  articles: number;
  projects: number;
  activities: number;
  messages: number;
  applications: number;
  newsletters: number;
}

export function AdminDashboard({ admin }: { admin: AdminUser }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) setStats(await res.json());
    } catch { /* */ }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void loadStats());
    return () => cancelAnimationFrame(id);
  }, [loadStats]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabs: { key: Tab; label: string; icon: ReactNode }[] = [
    { key: "dashboard", label: "Tableau de bord", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "articles", label: "Actualités", icon: <Newspaper className="w-4 h-4" /> },
    { key: "projects", label: "Projets", icon: <ClipboardList className="w-4 h-4" /> },
    { key: "activities", label: "Activités", icon: <Calendar className="w-4 h-4" /> },
    { key: "partners", label: "Partenaires", icon: <Handshake className="w-4 h-4" /> },
    { key: "messages", label: "Messages", icon: <MessageCircle className="w-4 h-4" /> },
    { key: "applications", label: "Candidatures", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary-dark text-white transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Image src="/images/logo-cipbg.png" alt="Logo" width={36} height={36} className="rounded-full" />
            <div>
              <p className="font-bold text-sm">CIPBG Admin</p>
              <p className="text-xs text-blue-300">{admin.name}</p>
            </div>
          </div>
        </div>
        <nav className="p-2 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                activeTab === tab.key ? "bg-white/10 text-white" : "text-blue-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="block text-xs text-blue-300 hover:text-white mb-2">← Voir le site</Link>
          <button onClick={handleLogout} className="w-full text-left text-xs text-red-300 hover:text-red-200">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between lg:justify-end">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-slate-500">Bienvenue, {admin.name}</span>
        </header>

        <div className="p-4 md:p-6">
          {activeTab === "dashboard" && <DashboardView stats={stats} />}
          {activeTab === "articles" && <ArticlesManager />}
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "activities" && <ActivitiesManager />}
          {activeTab === "partners" && <PartnersManager />}
          {activeTab === "messages" && <MessagesView />}
          {activeTab === "applications" && <ApplicationsView />}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ Dashboard View ═══════════════ */
function DashboardView({ stats }: { stats: DashboardStats | null }) {
  if (!stats) return <p className="text-slate-400">Chargement...</p>;
  const cards = [
    { label: "Articles", value: stats.articles, icon: <Newspaper className="w-5 h-5" />, color: "bg-blue-500" },
    { label: "Projets", value: stats.projects, icon: <ClipboardList className="w-5 h-5" />, color: "bg-green-500" },
    { label: "Activités", value: stats.activities, icon: <Calendar className="w-5 h-5" />, color: "bg-purple-500" },
    { label: "Messages", value: stats.messages, icon: <MessageCircle className="w-5 h-5" />, color: "bg-amber-500" },
    { label: "Candidatures", value: stats.applications, icon: <Users className="w-5 h-5" />, color: "bg-red-500" },
    { label: "Newsletter", value: stats.newsletters, icon: <Mail className="w-5 h-5" />, color: "bg-teal-500" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary">{c.icon}</span>
              <span className={`text-xs text-white px-2 py-1 rounded-full ${c.color}`}>{c.label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ Articles Manager ═══════════════ */
function ArticlesManager() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", imageUrl: "", category: "actualites", published: false });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/articles");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(id);
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ title: "", content: "", excerpt: "", imageUrl: "", category: "actualites", published: false });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch("/api/admin/articles", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Actualités</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light">
          {showForm ? "Annuler" : "+ Nouvel article"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <input type="text" placeholder="Titre *" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <textarea rows={6} placeholder="Contenu *" required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="text" placeholder="Résumé" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="url" placeholder="URL de l'image" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <div className="flex items-center gap-4">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 rounded-lg border text-sm bg-white">
              <option value="actualites">Actualités</option>
              <option value="communiques">Communiqués</option>
              <option value="evenements">Événements</option>
              <option value="paix">Paix</option>
              <option value="gouvernance">Gouvernance</option>
              <option value="jeunesse">Jeunesse</option>
              <option value="education">Éducation</option>
              <option value="environnement">Environnement</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Publier
            </label>
          </div>
          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-medium">Créer</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3 hidden md:table-cell">Catégorie</th>
              <th className="px-4 py-3 hidden md:table-cell">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as number} className="border-t">
                <td className="px-4 py-3 font-medium">{item.title as string}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-500">{item.category as string}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {item.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(item.id as number)} className="text-red-500 hover:text-red-700 text-xs">Supprimer</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400">Aucun article</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════ Projects Manager ═══════════════ */
function ProjectsManager() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", objectives: "", zone: "", status: "en_cours", category: "paix", imageUrl: "", published: false });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(id);
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", description: "", objectives: "", zone: "", status: "en_cours", category: "paix", imageUrl: "", published: false });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch("/api/admin/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Projets</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light">
          {showForm ? "Annuler" : "+ Nouveau projet"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <input type="text" placeholder="Nom du projet *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <textarea rows={4} placeholder="Description *" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="text" placeholder="Objectifs" value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="text" placeholder="Zone géographique" value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="url" placeholder="URL de l'image" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <div className="flex items-center gap-4 flex-wrap">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-4 py-2 rounded-lg border text-sm bg-white">
              <option value="en_cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="a_venir">À venir</option>
            </select>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-2 rounded-lg border text-sm bg-white">
              <option value="paix">Paix</option>
              <option value="gouvernance">Gouvernance</option>
              <option value="jeunesse">Jeunesse</option>
              <option value="education">Éducation</option>
              <option value="environnement">Environnement</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Publier
            </label>
          </div>
          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-medium">Créer</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3 hidden md:table-cell">Statut</th>
              <th className="px-4 py-3 hidden md:table-cell">Publié</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as number} className="border-t">
                <td className="px-4 py-3 font-medium">{item.name as string}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-500">{item.status as string}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {item.published ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(item.id as number)} className="text-red-500 hover:text-red-700 text-xs">Supprimer</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400">Aucun projet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════ Activities Manager ═══════════════ */
function ActivitiesManager() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", type: "conference", location: "", date: "", imageUrl: "", published: false });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/activities");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(id);
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/activities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ title: "", description: "", type: "conference", location: "", date: "", imageUrl: "", published: false });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cette activité ?")) return;
    await fetch("/api/admin/activities", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Activités</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light">
          {showForm ? "Annuler" : "+ Nouvelle activité"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <input type="text" placeholder="Titre *" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <textarea rows={4} placeholder="Description *" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <div className="grid sm:grid-cols-2 gap-4">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-4 py-2 rounded-lg border text-sm bg-white">
              <option value="conference">Conférence</option>
              <option value="atelier">Atelier</option>
              <option value="formation">Formation</option>
              <option value="sensibilisation">Sensibilisation</option>
              <option value="campagne">Campagne</option>
              <option value="colloque">Colloque</option>
              <option value="forum">Forum</option>
              <option value="communautaire">Communautaire</option>
            </select>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2 rounded-lg border text-sm" />
          </div>
          <input type="text" placeholder="Lieu" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="url" placeholder="URL de l'image" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Publier
          </label>
          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-medium">Créer</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3 hidden md:table-cell">Type</th>
              <th className="px-4 py-3 hidden md:table-cell">Publié</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as number} className="border-t">
                <td className="px-4 py-3 font-medium">{item.title as string}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-500">{item.type as string}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {item.published ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(item.id as number)} className="text-red-500 hover:text-red-700 text-xs">Supprimer</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400">Aucune activité</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════ Partners Manager ═══════════════ */
function PartnersManager() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", logoUrl: "", website: "", partnershipType: "" });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/partners");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(id);
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", description: "", logoUrl: "", website: "", partnershipType: "" });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce partenaire ?")) return;
    await fetch("/api/admin/partners", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Partenaires</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light">
          {showForm ? "Annuler" : "+ Nouveau partenaire"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <input type="text" placeholder="Nom *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="url" placeholder="URL du logo" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="url" placeholder="Site web" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <input type="text" placeholder="Type de partenariat" value={form.partnershipType} onChange={(e) => setForm({ ...form, partnershipType: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border text-sm" />
          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-medium">Créer</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3 hidden md:table-cell">Type</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as number} className="border-t">
                <td className="px-4 py-3 font-medium">{item.name as string}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-500">{(item.partnershipType as string) || "—"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(item.id as number)} className="text-red-500 hover:text-red-700 text-xs">Supprimer</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">Aucun partenaire</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════ Messages View ═══════════════ */
function MessagesView() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/messages");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(id);
  }, [load]);

  async function markRead(id: number) {
    await fetch("/api/admin/messages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce message ?")) return;
    await fetch("/api/admin/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Messages de contact</h1>
      <div className="space-y-4">
        {items.map((m) => (
          <div key={m.id as number} className={`bg-white rounded-xl p-6 shadow-sm ${m.read ? "opacity-60" : "border-l-4 border-accent"}`}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-bold text-slate-800">{m.subject as string}</h3>
                <p className="text-sm text-slate-500">{m.name as string} — {m.email as string} {m.phone ? `— ${m.phone}` : ""}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">{m.createdAt ? new Date(m.createdAt as string).toLocaleDateString("fr-FR") : ""}</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">{m.message as string}</p>
            <div className="flex gap-2">
              {!m.read && <button onClick={() => markRead(m.id as number)} className="text-xs text-primary hover:underline">Marquer comme lu</button>}
              <button onClick={() => handleDelete(m.id as number)} className="text-xs text-red-500 hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-slate-400 py-8">Aucun message</p>}
      </div>
    </div>
  );
}

/* ═══════════════ Applications View ═══════════════ */
function ApplicationsView() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/applications");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(id);
  }, [load]);

  async function markRead(id: number) {
    await fetch("/api/admin/applications", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cette candidature ?")) return;
    await fetch("/api/admin/applications", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Candidatures</h1>
      <div className="space-y-4">
        {items.map((a) => (
          <div key={a.id as number} className={`bg-white rounded-xl p-6 shadow-sm ${a.read ? "opacity-60" : "border-l-4 border-secondary"}`}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-bold text-slate-800">{a.firstName as string} {a.lastName as string}</h3>
                <p className="text-sm text-slate-500">{a.email as string} {a.phone ? `— ${a.phone}` : ""}</p>
              </div>
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                {a.participationType as string}
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-500 mb-2">
              {a.city ? <span><MapPin className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{String(a.city)}</span> : null}
              {a.profession ? <span><Briefcase className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{String(a.profession)}</span> : null}
              {a.domain ? <span><Target className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />{String(a.domain)}</span> : null}
            </div>
            {a.motivation ? <p className="text-sm text-slate-600 mb-3">{String(a.motivation)}</p> : null}
            <div className="flex gap-2">
              {!a.read && <button onClick={() => markRead(a.id as number)} className="text-xs text-primary hover:underline">Marquer comme lu</button>}
              <button onClick={() => handleDelete(a.id as number)} className="text-xs text-red-500 hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-slate-400 py-8">Aucune candidature</p>}
      </div>
    </div>
  );
}
