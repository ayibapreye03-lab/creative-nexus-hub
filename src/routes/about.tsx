import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SectionHeader } from "@/components/site/Section";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Creative Tech Global Enterprise" },
      {
        name: "description",
        content:
          "Creative Tech Global Enterprise is a multi-disciplinary creative and technology company delivering branding, design, writing, film and digital solutions.",
      },
      { property: "og:title", content: "About — Creative Tech Global Enterprise" },
      {
        property: "og:description",
        content: "A multi-disciplinary creative and technology company built around ideas, craft and modern tools.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Creativity", copy: "Ideas come first. Tools follow." },
  { title: "Innovation", copy: "New methods tested before they reach client work." },
  { title: "Excellence", copy: "Work delivered to specification, every stage reviewed." },
  { title: "Integrity", copy: "Clear scope, honest timelines, no invented claims." },
  { title: "Collaboration", copy: "Your knowledge plus our craft, in the same room." },
  { title: "Impact", copy: "Work measured by what it achieves, not how it looks in isolation." },
];

const beliefs = [
  "Creativity solves problems that budgets alone cannot.",
  "Technology should expand craft, never replace judgement.",
  "Good work is specific — to an audience, a channel, a moment.",
  "Consistency is what turns output into a brand.",
  "Clear process removes most of the risk from creative work.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="01 / About"
        title="A creative company built for a technological world."
        copy={`${site.name} is a multi-disciplinary creative and technology company operating from ${site.location}, serving clients wherever they are.`}
      />

      <Section>
        <SectionHeader
          index="02"
          label="Who we are"
          title="Design, writing, film and technology under one roof."
          copy="We work across branding, graphic design, printing, ghostwriting, content writing, website development, filmmaking, content creation, AI video, creative technology, consultation and digital media — so a project never has to be split between agencies that don't talk to each other."
        />
        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
          <div className="bg-background p-8">
            <p className="label-mono text-primary">Mission</p>
            <p className="mt-4 font-display text-2xl leading-snug tracking-tight">
              To deliver creative and technological solutions that help people and organisations
              communicate, build and grow.
            </p>
          </div>
          <div className="bg-background p-8">
            <p className="label-mono text-primary">Vision</p>
            <p className="mt-4 font-display text-2xl leading-snug tracking-tight">
              To become a leading creative technology company recognised for original thinking and
              professional execution.
            </p>
          </div>
        </div>
      </Section>

      <Section invert>
        <SectionHeader index="03" label="Values" title="What we hold to." invert />
        <div className="mt-12 grid gap-px bg-invert-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="bg-invert p-7">
              <h3 className="font-display text-xl tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-invert-foreground/70">{v.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader index="04" label="What we believe" title="Principles behind the work." />
        <ul className="mt-12 max-w-3xl divide-y divide-border border-y border-border">
          {beliefs.map((b, i) => (
            <li key={b} className="flex gap-6 py-6">
              <span className="label-mono text-primary">0{i + 1}</span>
              <p className="font-display text-xl leading-snug tracking-tight sm:text-2xl">{b}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeader
          index="05"
          label="Creativity + Technology"
          title="Creativity gives the idea. Technology gives it reach."
          copy="Every discipline we practise sits on both: a designer's judgement paired with modern production tools, a writer's structure paired with research systems, a director's eye paired with AI-assisted iteration when the timeline demands it."
        />
      </Section>
    </>
  );
}
