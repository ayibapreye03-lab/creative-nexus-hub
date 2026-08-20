import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/creative-hub", label: "Creative Hub" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-base font-semibold tracking-tight">
            Creative<span className="text-primary">Tech</span>
          </span>
          <span className="label-mono hidden text-muted-foreground sm:inline">Global</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="label-mono text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "label-mono text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/start-project"
            className="label-mono border border-primary bg-primary px-4 py-2.5 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Start a Project
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-4" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 font-display text-2xl tracking-tight"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/start-project"
              onClick={() => setOpen(false)}
              className="label-mono mt-5 block bg-primary px-4 py-4 text-center text-primary-foreground"
            >
              Start a Project
            </Link>
            <p className="label-mono mt-5 text-muted-foreground">{site.location}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
