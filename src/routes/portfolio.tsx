import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/Section";
import { portfolioCategories } from "@/lib/content";
import { projectsQuery, imageFor } from "@/lib/db";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(projectsQuery);
  },
  head: () => ({
    meta: [
      { title: "Portfolio — Creative Tech Global Enterprise" },
      {
        name: "description",
        content:
          "Concept projects across branding, design, print, web, writing, film, content and AI — showing how we approach creative problems.",
      },
      { property: "og:title", content: "Portfolio — Creative Tech Global Enterprise" },
      {
        property: "og:description",
        content: "Selected concept work demonstrating our creative and technical range.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const [filter, setFilter] = useState("All");

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Concept work, honestly labelled."
        copy="These are self-initiated concept projects created to demonstrate approach, craft and range — not client case studies."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap gap-2">
          {portfolioCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={c === filter}
              className={cn(
                "label-mono border px-3.5 py-2.5 transition-colors",
                c === filter
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-sm text-muted-foreground">No projects in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <article key={p.id} className="flex flex-col bg-background">
                <img
                  src={imageFor(p)}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span className="label-mono text-primary">{p.category}</span>
                    {p.is_concept && (
                      <span className="label-mono border border-border px-2 py-1 text-muted-foreground">
                        Concept project
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 font-display text-2xl tracking-tight">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
