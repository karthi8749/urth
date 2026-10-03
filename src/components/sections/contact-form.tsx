"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() || "/api/contact.php";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      project: String(data.get("project") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border border-cream/15 bg-ink/50 p-6 md:p-10"
      noValidate={false}
    >
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {[
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        {
          id: "project",
          label: "Project type",
          type: "text",
          required: false,
        },
      ].map((field) => (
        <label key={field.id} className="mb-8 block">
          <span className="text-[11px] uppercase tracking-[0.18em] text-cream/45">
            {field.label}
            {field.required && <span className="ml-1 text-orange">*</span>}
          </span>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required={field.required}
            className="mt-2 w-full border-b border-cream/20 bg-transparent py-3 text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-orange"
            placeholder=" "
          />
        </label>
      ))}

      <label className="mb-10 block">
        <span className="text-[11px] uppercase tracking-[0.18em] text-cream/45">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          minLength={10}
          className="mt-2 w-full resize-none border-b border-cream/20 bg-transparent py-3 text-cream outline-none transition-colors focus:border-orange"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center border border-orange bg-orange px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:border-cream hover:text-brown disabled:opacity-60"
      >
        {status === "loading"
          ? "Sending…"
          : status === "success"
            ? "Sent — thank you"
            : "Send message"}
      </button>

      {status === "success" && (
        <p className="mt-6 text-sm text-sky">We&apos;ll be in touch soon.</p>
      )}
      {status === "error" && (
        <p className="mt-6 text-sm text-orange" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
