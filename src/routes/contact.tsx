import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { site, mailHref, preferredWhatsappHref, telHref, whatsappHref } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Creative Tech Global Enterprise" },
      {
        name: "description",
        content:
          "Talk to Creative Tech Global Enterprise about branding, design, print, writing, websites, film, content and AI-assisted creative work.",
      },
      { property: "og:title", content: "Contact — Creative Tech Global Enterprise" },
      {
        property: "og:description",
        content: "Reach the team by email, phone or WhatsApp, or send a full project brief.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const wa = whatsappHref();

  return (
    <>
      <PageHeader
        label="Contact"
        title="Start a conversation."
        copy="Tell us what you are building. We reply to every serious enquiry with next steps, not a sales sequence."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-px bg-border sm:grid-cols-3">
          <a href={mailHref} className="bg-background p-8 transition-colors hover:bg-surface">
            <Mail className="size-5 text-primary" aria-hidden />
            <h2 className="label-mono mt-7 text-muted-foreground">Email</h2>
            <p className="mt-2 font-display text-xl tracking-tight break-words">{site.email}</p>
          </a>
          <a href={telHref} className="bg-background p-8 transition-colors hover:bg-surface">
            <Phone className="size-5 text-primary" aria-hidden />
            <h2 className="label-mono mt-7 text-muted-foreground">Phone</h2>
            <p className="mt-2 font-display text-xl tracking-tight">{site.phone}</p>
          </a>
          <div className="bg-background p-8">
            <MapPin className="size-5 text-primary" aria-hidden />
            <h2 className="label-mono mt-7 text-muted-foreground">Location</h2>
            <p className="mt-2 font-display text-xl tracking-tight">{site.location}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/start-project"
            className="label-mono inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Send a project brief <ArrowRight className="size-3.5" />
          </Link>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(event) => {
                const preferredHref = preferredWhatsappHref();
                if (preferredHref && preferredHref !== wa) {
                  event.preventDefault();
                  window.location.href = preferredHref;
                }
              }}
              className="label-mono inline-flex items-center gap-2 border border-border px-5 py-3 transition-colors hover:border-foreground"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>
      </div>
    </>
  );
}
