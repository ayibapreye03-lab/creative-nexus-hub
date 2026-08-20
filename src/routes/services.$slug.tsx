import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { serviceBySlug, services } from "@/lib/content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { name: service.name, summary: service.summary, slug: service.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Creative Tech Global Enterprise`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = serviceBySlug(slug)!;
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <Link to="/services" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" /> All services
          </Link>
          <service.icon className="mt-10 size-8 text-primary" aria-hidden />
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl">
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.what}
          </p>
          <Link
            to="/start-project"
            search={{ service: service.slug }}
            className="label-mono mt-9 inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Start this project <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className="label-mono text-primary">Who it's for</h2>
            <ul className="mt-6 space-y-3">
              {service.who.map((w) => (
                <li key={w} className="text-sm text-muted-foreground">{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label-mono text-primary">What we create</h2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 block size-1 shrink-0 bg-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label-mono text-primary">Example project types</h2>
            <ul className="mt-6 space-y-3">
              {service.examples.map((e) => (
                <li key={e} className="text-sm text-muted-foreground">{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section invert>
        <h2 className="font-display text-4xl tracking-tight sm:text-5xl">How it runs</h2>
        <ol className="mt-12 grid gap-px bg-invert-foreground/10 sm:grid-cols-2 lg:grid-cols-5">
          {service.process.map((p, i) => (
            <li key={p} className="bg-invert p-6">
              <span className="label-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 font-display text-lg leading-snug tracking-tight">{p}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <h2 className="label-mono text-muted-foreground">Related services</h2>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="bg-background p-7 transition-colors hover:bg-surface">
              <o.icon className="size-5 text-primary" aria-hidden />
              <h3 className="mt-6 font-display text-xl tracking-tight">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.summary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
