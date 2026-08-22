import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHeader, Section, SectionHeader } from "@/components/site/Section";
import { labTopics } from "@/lib/content";
import { articlesQuery, imageFor } from "@/lib/db";

export const Route = createFileRoute("/creative-hub")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(articlesQuery);
  },
  head: () => ({
    meta: [
      { title: "Creative Hub — Creative Tech Global Enterprise" },
      {
        name: "description",
        content:
          "Notes, experiments and thinking on design, branding, storytelling, AI and emerging creative technology.",
      },
      { property: "og:title", content: "Creative Hub — Creative Tech Global Enterprise" },
      {
        property: "og:description",
        content: "Where we publish what we are testing across creativity and technology.",
      },
    ],
  }),
  component: CreativeHubPage,
});

function CreativeHubPage() {
  const { data: articles } = useSuspenseQuery(articlesQuery);

  return (
    <>
      <PageHeader
        label="Creative Hub"
        title="What we're testing, written down."
        copy="A working notebook on design, storytelling and the technology reshaping how creative work gets made."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">First articles publishing soon.</p>
        ) : (
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article key={a.id} className="flex flex-col bg-background">
                <img
                  src={imageFor(a)}
                  alt={a.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                  <span className="label-mono text-primary">{a.category}</span>
                  <h2 className="mt-5 font-display text-2xl leading-snug tracking-tight">
                    {a.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Section invert>
        <SectionHeader
          index="/"
          label="Innovation Lab"
          title="Areas we're actively exploring."
          invert
        />
        <div className="mt-12 grid gap-px bg-invert-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {labTopics.map((t) => (
            <div key={t.title} className="bg-invert p-7">
              <h3 className="font-display text-xl tracking-tight">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-invert-foreground/70">{t.copy}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
