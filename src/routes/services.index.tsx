import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { services } from "@/lib/content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Creative Tech Global Enterprise" },
      {
        name: "description",
        content:
          "Branding, graphic design, printing, ghostwriting, content writing, websites, filmmaking, content creation, AI video, creative technology and consultation.",
      },
      { property: "og:title", content: "Services — Creative Tech Global Enterprise" },
      {
        property: "og:description",
        content: "Twelve creative and technology services delivered end to end by one team.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Twelve disciplines. One team."
        copy="Every service below is delivered end to end — brief, direction, production, review and handover — so nothing gets lost between suppliers."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-surface"
            >
              <div className="flex items-start justify-between">
                <s.icon className="size-6 text-primary" aria-hidden />
                <span className="label-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-8 font-display text-2xl tracking-tight">{s.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <span className="label-mono mt-7 inline-flex items-center gap-2 text-primary">
                Explore <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
