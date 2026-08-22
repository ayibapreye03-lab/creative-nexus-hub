import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Section, SectionHeader } from "@/components/site/Section";
import { Ecosystem } from "@/components/site/Ecosystem";
import { ProjectSelector } from "@/components/site/ProjectSelector";
import { services, processStages, trustPoints } from "@/lib/content";
import { site } from "@/config/site";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creative Tech Global Enterprise — Where Creativity Meets Technology" },
      { name: "description", content: site.description },
      {
        property: "og:title",
        content: "Creative Tech Global Enterprise — Where Creativity Meets Technology",
      },
      { property: "og:description", content: site.description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-15"
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
          <p className="label-mono text-primary">{site.tagline}</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Creative and digital solutions, engineered end to end.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/start-project"
              className="label-mono inline-flex items-center gap-2 bg-primary px-5 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a project <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className="label-mono inline-flex items-center gap-2 border border-border px-5 py-3.5 transition-colors hover:border-foreground"
            >
              Explore services
            </Link>
          </div>
          <dl className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-3">
            {trustPoints.slice(0, 3).map((t) => (
              <div key={t.title} className="bg-background p-6">
                <dt className="label-mono text-primary">{t.title}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <SectionHeader
          index="01"
          label="Creative ecosystem"
          title="One connected system, not scattered services."
          copy="Every discipline we run feeds the others — a brand identity informs the print, the film, the website and the content that follow."
        />
        <Ecosystem />
      </Section>

      <Section>
        <SectionHeader
          index="02"
          label="Services"
          title="Twelve disciplines under one roof."
          copy="From brand strategy to AI-assisted production, delivered by one team with one standard."
        />
        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group bg-background p-7 transition-colors hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl tracking-tight">{s.name}</h3>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="03"
          label="Project selector"
          title="Tell us what you need. See how we'd approach it."
        />
        <ProjectSelector />
      </Section>

      <Section invert>
        <SectionHeader
          invert
          index="04"
          label="Process"
          title="A clear route from brief to delivery."
        />
        <ol className="mt-14 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {processStages.map((p) => (
            <li key={p.name} className="bg-invert p-7">
              <span className="label-mono text-primary">{p.number}</span>
              <h3 className="mt-4 font-display text-xl tracking-tight">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-invert-foreground/70">{p.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="label-mono text-primary">05 / Start</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Have a project in mind? Send us the brief.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Share the scope, timeline and budget range. We reply with an approach and next steps.
            </p>
          </div>
          <Link
            to="/start-project"
            className="label-mono inline-flex items-center gap-2 bg-primary px-5 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a project <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
