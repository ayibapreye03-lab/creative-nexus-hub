import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { selectorOptions } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProjectSelector() {
  const [active, setActive] = useState(selectorOptions[0]!.id);
  const option = selectorOptions.find((o) => o.id === active)!;

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-wrap gap-2 self-start">
        {selectorOptions.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setActive(o.id)}
            aria-pressed={o.id === active}
            className={cn(
              "label-mono border px-3.5 py-2.5 transition-colors",
              o.id === active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="border border-border bg-surface p-7 sm:p-9">
        <p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">{option.copy}</p>
        <ol className="mt-7 space-y-3">
          {option.steps.map((s, i) => (
            <li key={s} className="flex gap-4 text-sm text-muted-foreground">
              <span className="label-mono text-primary">0{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <Link
          to="/start-project"
          search={{ service: option.service }}
          className="label-mono mt-8 inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
        >
          Start this project <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
