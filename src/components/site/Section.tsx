import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  invert,
  id,
}: {
  children: ReactNode;
  className?: string;
  invert?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-border",
        invert && "bg-invert text-invert-foreground",
        className,
      )}
      style={invert ? { borderColor: "rgba(0,0,0,0.1)" } : undefined}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  copy,
  invert,
}: {
  index: string;
  label: string;
  title: ReactNode;
  copy?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="label-mono text-primary">{index}</span>
        <span
          className={cn("label-mono", invert ? "text-invert-foreground/60" : "text-muted-foreground")}
        >
          {label}
        </span>
      </div>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {copy && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed",
            invert ? "text-invert-foreground/70" : "text-muted-foreground",
          )}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
        <p className="label-mono text-primary">{label}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl">
          {title}
        </h1>
        {copy && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy}
          </p>
        )}
      </div>
    </header>
  );
}
