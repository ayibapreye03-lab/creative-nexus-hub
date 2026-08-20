import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, Music2 } from "lucide-react";
import { site, mailHref, telHref } from "@/config/site";
import { services } from "@/lib/content";

const socials = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "tiktok", label: "TikTok", Icon: Music2 },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "youtube", label: "YouTube", Icon: Youtube },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              Where creativity
              <br />
              meets <span className="text-primary">technology</span>.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ key, label, Icon }) => {
                const href = site.social[key];
                return href ? (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex size-10 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                ) : (
                  <span
                    key={key}
                    title={`${label} link coming soon`}
                    aria-label={`${label} link coming soon`}
                    className="flex size-10 items-center justify-center border border-border text-muted-foreground/50"
                  >
                    <Icon className="size-4" />
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="label-mono text-muted-foreground">Services</h2>
            <ul className="mt-5 space-y-2.5">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-sm text-primary">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="label-mono text-muted-foreground">Contact</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={mailHref} className="transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={telHref} className="transition-colors hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
              <li className="pt-2">
                <Link to="/start-project" className="text-primary">
                  Start a project
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-foreground">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-muted-foreground">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="label-mono text-muted-foreground">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
