"use client";

import { useState } from "react";

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    city: "",
    profession: "",
    domain: "",
    motivation: "",
    participationType: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ lastName: "", firstName: "", email: "", phone: "", city: "", profession: "", domain: "", motivation: "", participationType: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white text-slate-700 p-8 rounded-2xl text-center border border-green-100 shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-5 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2 text-slate-900">Candidature envoyée !</h3>
        <p>Merci pour votre intérêt. Nous vous contacterons bientôt.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
          <input type="text" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Prénom *</label>
          <input type="text" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
        <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
          <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Profession</label>
          <input type="text" value={form.profession} onChange={(e) => update("profession", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Domaine d&apos;intérêt</label>
          <select value={form.domain} onChange={(e) => update("domain", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white">
            <option value="">Sélectionner</option>
            <option value="paix">Paix et cohésion sociale</option>
            <option value="gouvernance">Bonne gouvernance</option>
            <option value="democratie">Démocratie et citoyenneté</option>
            <option value="education">Éducation des filles</option>
            <option value="jeunesse">Emploi des jeunes</option>
            <option value="environnement">Protection de l&apos;environnement</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Type de participation *</label>
        <select required value={form.participationType} onChange={(e) => update("participationType", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white">
          <option value="">Sélectionner</option>
          <option value="benevole">Bénévole</option>
          <option value="membre">Membre</option>
          <option value="partenaire">Partenaire</option>
          <option value="expert">Expert</option>
          <option value="ambassadeur">Ambassadeur</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Motivation</label>
        <textarea rows={4} value={form.motivation} onChange={(e) => update("motivation", e.target.value)}
          placeholder="Pourquoi souhaitez-vous rejoindre CIPBG Afrique ?"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma candidature"}
      </button>

      {status === "error" && <p className="text-red-600 text-sm text-center">Erreur lors de l&apos;envoi. Veuillez réessayer.</p>}
    </form>
  );
}
