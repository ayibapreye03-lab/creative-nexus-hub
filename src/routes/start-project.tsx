import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PageHeader } from "@/components/site/Section";
import { services, budgetRanges, contactMethods } from "@/lib/content";
import { inquirySchema } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiries.functions";
import { whatsappHref } from "@/config/site";

export const Route = createFileRoute("/start-project")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    const value = search["service"];
    return typeof value === "string" ? { service: value } : {};
  },
  head: () => ({
    meta: [
      { title: "Start a Project — Creative Tech Global Enterprise" },
      {
        name: "description",
        content:
          "Send us your brief: choose a service, describe the work, set a budget range and timeline, and we'll respond with next steps.",
      },
      { property: "og:title", content: "Start a Project — Creative Tech Global Enterprise" },
      {
        property: "og:description",
        content: "Tell us what you're building and how you'd like to be contacted.",
      },
    ],
  }),
  component: StartProjectPage,
});

const field =
  "mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function StartProjectPage() {
  const { service } = Route.useSearch();
  const send = useServerFn(submitInquiry);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const values = Object.fromEntries(form.entries());
    const parsed = inquirySchema.safeParse(values);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus(null);
      return;
    }

    setErrors({});
    setPending(true);

    const d = parsed.data;
    const serviceName = services.find((s) => s.slug === d.service)?.name ?? d.service;
    const message = [
      "New project request — Creative Tech Global Enterprise",
      "",
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      d.phone ? `Phone: ${d.phone}` : null,
      d.company ? `Company: ${d.company}` : null,
      `Service: ${serviceName}`,
      d.budget ? `Budget: ${d.budget}` : null,
      d.deadline ? `Timeline: ${d.deadline}` : null,
      `Preferred contact: ${d.contact_method}`,
      "",
      "Project description:",
      d.description,
    ]
      .filter(Boolean)
      .join("\n");

    const wa = whatsappHref(message);
    // Open the WhatsApp tab synchronously so mobile browsers don't block it.
    const waWindow = wa ? window.open(wa, "_blank", "noopener,noreferrer") : null;

    try {
      const result = await send({ data: parsed.data });
      if (wa && !waWindow) window.location.href = wa;
      setStatus(
        result.ok
          ? { ok: true, message: "Request sent — finish up in WhatsApp to reach us instantly." }
          : result,
      );
      if (result.ok) formEl.reset();
    } catch {
      if (wa && !waWindow) window.location.href = wa;
      setStatus({ ok: false, message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }


  return (
    <>
      <PageHeader
        label="Start a Project"
        title="Tell us what you're building."
        copy="The more context you give, the more useful our first reply will be. Every field marked optional can be left blank."
      />

      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <form onSubmit={onSubmit} noValidate className="grid gap-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label className="label-mono text-muted-foreground" htmlFor="name">
                Name
              </label>
              <input id="name" name="name" className={field} autoComplete="name" />
              {errors["name"] && <p className="mt-2 text-xs text-primary">{errors["name"]}</p>}
            </div>
            <div>
              <label className="label-mono text-muted-foreground" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" className={field} autoComplete="email" />
              {errors["email"] && <p className="mt-2 text-xs text-primary">{errors["email"]}</p>}
            </div>
            <div>
              <label className="label-mono text-muted-foreground" htmlFor="phone">
                Phone (optional)
              </label>
              <input id="phone" name="phone" className={field} autoComplete="tel" />
            </div>
            <div>
              <label className="label-mono text-muted-foreground" htmlFor="company">
                Company (optional)
              </label>
              <input id="company" name="company" className={field} autoComplete="organization" />
            </div>
          </div>

          <div>
            <label className="label-mono text-muted-foreground" htmlFor="service">
              Service needed
            </label>
            <select id="service" name="service" defaultValue={service ?? ""} className={field}>
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors["service"] && <p className="mt-2 text-xs text-primary">{errors["service"]}</p>}
          </div>

          <div>
            <label className="label-mono text-muted-foreground" htmlFor="description">
              Project description
            </label>
            <textarea id="description" name="description" rows={6} className={field} />
            {errors["description"] && (
              <p className="mt-2 text-xs text-primary">{errors["description"]}</p>
            )}
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label className="label-mono text-muted-foreground" htmlFor="budget">
                Budget range (optional)
              </label>
              <select id="budget" name="budget" defaultValue="" className={field}>
                <option value="">Select a range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-mono text-muted-foreground" htmlFor="deadline">
                Timeline (optional)
              </label>
              <input id="deadline" name="deadline" placeholder="e.g. 6 weeks" className={field} />
            </div>
          </div>

          <div>
            <label className="label-mono text-muted-foreground" htmlFor="contact_method">
              Preferred contact method
            </label>
            <select
              id="contact_method"
              name="contact_method"
              defaultValue={contactMethods[0]}
              className={field}
            >
              {contactMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={pending}
              className="label-mono border border-primary bg-primary px-6 py-3.5 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send via WhatsApp"}
            </button>
            {status && (
              <p className={status.ok ? "text-sm text-primary" : "text-sm text-muted-foreground"}>
                {status.message}
              </p>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Submitting opens WhatsApp with your brief already written out — just press send.
          </p>

        </form>
      </div>
    </>
  );
}
