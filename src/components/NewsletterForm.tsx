"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        required
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 rounded text-sm text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "S'inscrire"}
      </button>
      {status === "success" && (
        <p className="text-green-300 text-xs">Inscription réussie !</p>
      )}
      {status === "error" && (
        <p className="text-red-300 text-xs">Erreur. Réessayez.</p>
      )}
    </form>
  );
}
