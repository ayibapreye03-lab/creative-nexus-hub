CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  description text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_url text,
  project_url text,
  is_concept boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published projects are public" ON public.projects
FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins manage projects" ON public.projects
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  image_url text,
  category text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles are public" ON public.articles
FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins manage articles" ON public.articles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON public.articles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  description text NOT NULL,
  budget text,
  deadline text,
  contact_method text NOT NULL DEFAULT 'email',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.inquiries TO service_role;
GRANT SELECT, UPDATE ON public.inquiries TO authenticated;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read inquiries" ON public.inquiries
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiries" ON public.inquiries
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.projects (title, slug, category, description, body, image_url, sort_order) VALUES
('Meridian Identity System', 'meridian-identity-system', 'Branding', 'A complete visual identity concept for a modern professional services brand.', 'A concept project exploring how a contemporary services brand can express clarity and confidence. The system covers logotype construction, a restrained colour palette, typographic hierarchy, stationery, signage and digital application, all documented in a brand guideline set that any team can apply consistently.', '/images/portfolio/branding.jpg', 1),
('Lumen Campaign Design', 'lumen-campaign-design', 'Design', 'Graphic design concept for an integrated multi-channel campaign.', 'A concept campaign showing how a single creative idea can travel across posters, social formats, motion frames and print collateral without losing its voice. The work demonstrates grid discipline, type-led composition and a scalable asset library.', '/images/portfolio/design.jpg', 2),
('Foundry Print Collection', 'foundry-print-collection', 'Print', 'Print production concept covering stationery, packaging and large format.', 'A print-led concept examining substrate choice, finishing, colour management and prepress preparation. It includes business stationery, folded literature, promotional packaging and large-format signage prepared to production-ready specification.', '/images/portfolio/print.jpg', 3),
('Atlas Web Platform', 'atlas-web-platform', 'Web', 'Responsive website and design system concept for a growing organisation.', 'A concept web platform built around a reusable component library, accessible colour contrast, sensible performance budgets and a content model that non-technical teams can maintain. Includes desktop, tablet and mobile compositions.', '/images/portfolio/web.jpg', 4),
('The Long Form Series', 'the-long-form-series', 'Writing', 'Ghostwriting and editorial concept for a non-fiction book programme.', 'A writing concept covering interview-led research, outline architecture, chapter drafting, developmental editing and final manuscript preparation for print and digital publication.', '/images/portfolio/writing.jpg', 5),
('Northbound Short Film', 'northbound-short-film', 'Film', 'Filmmaking concept from treatment through to final grade.', 'A short-film concept documenting treatment writing, shot listing, production scheduling, direction, edit, sound design and colour grade — the full narrative pipeline in one project.', '/images/portfolio/film.jpg', 6),
('Signal Content Studio', 'signal-content-studio', 'Content', 'Social and digital content system concept for consistent publishing.', 'A content concept built around repeatable formats: templated frames, a tone-of-voice guide, a shooting kit and a publishing calendar that keeps output consistent without exhausting a small team.', '/images/portfolio/content.jpg', 7),
('Synthesis AI Video', 'synthesis-ai-video', 'AI', 'AI-assisted video concept combining generated footage with directed edit.', 'A concept exploring where AI genuinely helps video production: previsualisation, b-roll generation, voice pacing and iteration speed — always assembled under human direction with a clear editorial point of view.', '/images/portfolio/ai.jpg', 8),
('Prism Digital Media', 'prism-digital-media', 'Design', 'Digital media concept blending photography, motion and interface design.', 'A concept piece showing how photography, motion graphics and interface design can share one visual language across a digital product and its marketing surface.', '/images/portfolio/photography.jpg', 9);

INSERT INTO public.articles (title, slug, excerpt, content, image_url, category) VALUES
('The Future of AI and Creative Work', 'the-future-of-ai-and-creative-work', 'AI is changing how creative work is produced — but not why it matters. A practical look at where the tools help and where judgement still decides.', 'Artificial intelligence has moved from novelty to daily instrument in creative studios. It drafts, it iterates, it renders, and it removes hours of mechanical labour from a production week.

What it does not do is decide what is worth making. Direction, taste, audience understanding and editorial judgement remain human responsibilities, and they are precisely the parts of creative work that clients pay for.

The studios that benefit most treat AI as a production accelerator inside a disciplined process: research and strategy first, generation second, human refinement always. The output is faster, but the thinking is unchanged.

For businesses commissioning creative work, the practical question is not whether a studio uses AI. It is whether the studio can explain the decisions behind the work.', '/images/hub/ai.jpg', 'AI'),
('Why Every Business Needs a Strong Brand', 'why-every-business-needs-a-strong-brand', 'A brand is not a logo. It is the set of decisions that make an organisation recognisable, consistent and trusted.', 'Most organisations discover the cost of a weak brand indirectly. Materials look different in every channel. New staff invent their own templates. Customers cannot describe what the company does.

A brand system solves this with decisions made once and applied everywhere: a logotype and its usage rules, a colour palette with defined roles, a typographic hierarchy, image direction and a tone of voice.

The commercial value is compounding. Consistency reduces production time, increases recognition and makes every subsequent piece of marketing cheaper to produce and easier to trust.

Branding is not decoration. It is infrastructure.', '/images/hub/branding.jpg', 'Branding'),
('How to Turn an Idea Into a Creative Project', 'how-to-turn-an-idea-into-a-creative-project', 'The distance between an idea and a finished piece of work is a process. Here is the shape of that process.', 'Ideas fail in execution far more often than in conception. The fix is structure.

Start by writing the objective in a single sentence: what should exist at the end, and what should it change. Then define the audience precisely enough that you could name three real people in it.

Next, decide the format. A book, a film, a campaign and a website solve different problems and demand different budgets. Choosing early prevents expensive rework.

Then sequence the work: research, creative direction, production, refinement, delivery. Give each stage a decision-maker and a deadline.

The idea is the easy part. The schedule is the project.', '/images/hub/idea.jpg', 'Creative Entrepreneurship'),
('The Growing Role of AI in Video Production', 'the-growing-role-of-ai-in-video-production', 'From previsualisation to rough assembly, AI tools are compressing video timelines. The craft decisions have not moved.', 'Video has always been the most resource-intensive creative discipline. AI is reducing that cost at specific points in the pipeline.

Previsualisation is the clearest gain: generating reference frames and motion tests before a crew is booked makes creative disagreement cheap. Generated b-roll fills gaps that would once have required a second shoot day. Automated transcription and rough assembly shorten the edit.

What still requires people is the story. Pacing, performance, emphasis and restraint are editorial choices, and audiences notice their absence immediately.

Used well, AI buys back time that can be spent on direction rather than logistics.', '/images/hub/video.jpg', 'Filmmaking'),
('Understanding the Creative Technology Industry', 'understanding-the-creative-technology-industry', 'Creative technology sits between design, media and engineering. Understanding the overlap explains why multidisciplinary studios exist.', 'For most of the last century, creative disciplines were separated by their production technology. Print, film, writing and broadcast each required different equipment, different skills and different companies.

Digital production dissolved most of those boundaries. A single team can now design a brand, build the website that carries it, write its content, produce its film and distribute all of it — because the underlying tools are shared.

That convergence is what the term creative technology describes: the practice of combining design thinking with technical capability to produce work that neither discipline could deliver alone.

For clients, the practical benefit is coherence. One team holding strategy, design, writing and production produces work that agrees with itself.', '/images/hub/tech.jpg', 'Creative Technology');