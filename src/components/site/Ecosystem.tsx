import { useState } from "react";
import { ecosystem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Ecosystem() {
  const [active, setActive] = useState(ecosystem[0]!.id);
  const node = ecosystem.find((n) => n.id === active)!;
  const R = 150;

  return (
    <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative mx-auto w-full max-w-md">
        <svg viewBox="-200 -200 400 400" className="w-full" role="img" aria-label="Creative Tech ecosystem diagram">
          {ecosystem.map((n) => {
            const x = Math.cos((n.angle * Math.PI) / 180) * R;
            const y = Math.sin((n.angle * Math.PI) / 180) * R;
            return (
              <line
                key={n.id}
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth={n.id === active ? 1.4 : 0.6}
                className={n.id === active ? "text-primary" : "text-border"}
              />
            );
          })}
          <circle r={44} className="fill-primary" />
          <text textAnchor="middle" y={-2} className="fill-primary-foreground" fontSize={11} fontWeight={600}>
            CREATIVE
          </text>
          <text textAnchor="middle" y={12} className="fill-primary-foreground" fontSize={11} fontWeight={600}>
            TECH
          </text>
        </svg>

        {ecosystem.map((n) => {
          const x = Math.cos((n.angle * Math.PI) / 180) * (R / 400) * 100;
          const y = Math.sin((n.angle * Math.PI) / 180) * (R / 400) * 100;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(n.id)}
              aria-pressed={n.id === active}
              className={cn(
                "label-mono absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border px-2.5 py-1.5 transition-colors",
                n.id === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
              style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      <div className="border border-border bg-surface p-7">
        <p className="label-mono text-primary">{node.label}</p>
        <p className="mt-4 font-display text-2xl leading-snug tracking-tight">{node.blurb}</p>
        <ul className="mt-6 space-y-2.5">
          {node.items.map((i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-2 block size-1 shrink-0 bg-primary" />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
