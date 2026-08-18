"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
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
        <h3 className="font-bold text-xl mb-2 text-slate-900">Message envoyé !</h3>
        <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet *</label>
        <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
          <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Objet *</label>
        <input type="text" required value={form.subject} onChange={(e) => update("subject", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
        <textarea rows={6} required value={form.message} onChange={(e) => update("message", e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
      </button>

      {status === "error" && <p className="text-red-600 text-sm text-center">Erreur lors de l&apos;envoi. Veuillez réessayer.</p>}
    </form>
  );
}
