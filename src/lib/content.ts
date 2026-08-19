import {
  Palette,
  Shapes,
  Printer,
  PenTool,
  FileText,
  Code2,
  Film,
  Camera,
  Sparkles,
  Cpu,
  Compass,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  what: string;
  who: string[];
  deliverables: string[];
  process: string[];
  examples: string[];
};

export const services: Service[] = [
  {
    slug: "graphic-design",
    name: "Graphic Design",
    icon: Palette,
    summary:
      "Professional visual communication for brands, businesses, campaigns and digital platforms.",
    what: "Design work that carries a message clearly — from a single campaign asset to a full library of templates a team can reuse without losing consistency.",
    who: ["Businesses running campaigns", "Organisations and institutions", "Startups and founders", "Event and programme teams"],
    deliverables: [
      "Campaign and advertising artwork",
      "Social media design systems",
      "Presentation and report design",
      "Marketing and promotional materials",
      "Editorial and publication layout",
    ],
    process: ["Brief and objective", "Concept directions", "Design development", "Review and refinement", "Final artwork handover"],
    examples: ["Campaign visual set", "Social template library", "Investor deck design", "Event programme design"],
  },
  {
    slug: "branding",
    name: "Branding",
    icon: Shapes,
    summary: "Complete visual identity and brand development.",
    what: "The decisions that make an organisation recognisable and consistent: logotype, colour, typography, imagery, voice and the rules that hold them together.",
    who: ["New businesses", "Organisations repositioning", "Personal and professional brands", "Product and service launches"],
    deliverables: [
      "Logotype and mark construction",
      "Colour and typographic system",
      "Brand guidelines document",
      "Stationery and collateral",
      "Digital and social application",
    ],
    process: ["Discovery and positioning", "Creative direction", "Identity design", "System build and testing", "Guidelines and rollout"],
    examples: ["Full identity system", "Brand refresh", "Sub-brand architecture", "Personal brand identity"],
  },
  {
    slug: "printing",
    name: "Printing",
    icon: Printer,
    summary: "Professional print solutions for businesses, organisations, events and promotional needs.",
    what: "Print-ready design and production management — correct colour, correct bleed, correct substrate, delivered without surprises at the press.",
    who: ["Businesses and retailers", "Event organisers", "Institutions and NGOs", "Authors and publishers"],
    deliverables: [
      "Business stationery",
      "Brochures, flyers and folded literature",
      "Packaging and labels",
      "Large-format signage and banners",
      "Books and bound documents",
    ],
    process: ["Specification", "Design and layout", "Proofing", "Prepress preparation", "Production and delivery"],
    examples: ["Corporate stationery set", "Product packaging", "Exhibition signage", "Printed book interior"],
  },
  {
    slug: "ghostwriting",
    name: "Ghostwriting",
    icon: PenTool,
    summary: "Professional writing for books, eBooks, articles, speeches, scripts and other projects.",
    what: "Your thinking, written properly. Research and interviews turn into structured, publishable writing that still sounds like you.",
    who: ["Authors and thought leaders", "Executives and speakers", "Coaches and consultants", "Organisations publishing reports"],
    deliverables: ["Books and eBooks", "Long-form articles", "Speeches and talks", "Scripts and narration", "Whitepapers and reports"],
    process: ["Interview and research", "Outline architecture", "Drafting", "Developmental edit", "Final manuscript"],
    examples: ["Non-fiction book", "Lead-magnet eBook", "Keynote speech", "Executive thought-leadership series"],
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    icon: FileText,
    summary: "Strategic and engaging written content for digital and traditional platforms.",
    what: "Writing built for a channel and an audience — website copy that converts, articles that rank, captions that sound human.",
    who: ["Businesses and brands", "Marketing teams", "Startups", "Creators and publishers"],
    deliverables: ["Website and landing page copy", "Blog and editorial articles", "Email sequences", "Social copy", "Product and service descriptions"],
    process: ["Audience and intent", "Content plan", "Drafting", "Edit and fact-check", "Publish-ready delivery"],
    examples: ["Website copy rewrite", "Monthly article programme", "Launch email sequence", "Brand tone-of-voice guide"],
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: Code2,
    summary: "Responsive and professional websites for businesses, brands and individuals.",
    what: "Websites that are fast, accessible, maintainable and designed around what the business actually needs visitors to do.",
    who: ["Businesses and organisations", "Professional practices", "Creators and portfolios", "Startups and products"],
    deliverables: ["Responsive website design", "Front-end development", "Content management setup", "Performance and SEO groundwork", "Handover and training"],
    process: ["Requirements and structure", "Design system", "Build", "Testing and optimisation", "Launch and support"],
    examples: ["Business website", "Portfolio site", "Landing page system", "Content-managed publication"],
  },
  {
    slug: "filmmaking",
    name: "Filmmaking",
    icon: Film,
    summary: "Creative storytelling through film and video production.",
    what: "Narrative and commercial film work handled end to end, from written treatment through direction, edit, sound and colour.",
    who: ["Brands and businesses", "Organisations and institutions", "Creators and artists", "Event and campaign teams"],
    deliverables: ["Treatments and scripts", "Direction and production", "Editing and post", "Sound design", "Colour grading"],
    process: ["Treatment", "Pre-production", "Production", "Post-production", "Delivery in required formats"],
    examples: ["Brand film", "Documentary short", "Campaign commercial", "Event film"],
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    icon: Camera,
    summary: "Creative content designed for social media, campaigns and digital audiences.",
    what: "Repeatable formats and production systems that keep publishing consistent instead of sporadic.",
    who: ["Brands and businesses", "Creators and personalities", "Marketing teams", "Community organisations"],
    deliverables: ["Photo and video content", "Short-form edits", "Templated frame systems", "Publishing calendars", "Channel asset kits"],
    process: ["Format design", "Production plan", "Shoot and create", "Edit and package", "Schedule and publish"],
    examples: ["Monthly content package", "Product launch content", "Founder content system", "Campaign content kit"],
  },
  {
    slug: "ai-video-creation",
    name: "AI Video Creation",
    icon: Sparkles,
    summary: "AI-assisted video production for storytelling, marketing, education and creative campaigns.",
    what: "AI used where it genuinely helps — previsualisation, generated b-roll, faster iteration — always assembled under human direction.",
    who: ["Marketing teams", "Educators and trainers", "Creators", "Organisations with tight production windows"],
    deliverables: ["AI-assisted previsualisation", "Generated footage and b-roll", "Narration and voice pacing", "Directed edit and finishing"],
    process: ["Concept and script", "Previsualisation", "Generation", "Human edit and direction", "Final delivery"],
    examples: ["Explainer video", "Concept previsualisation", "Training video series", "Campaign teaser"],
  },
  {
    slug: "creative-technology",
    name: "Creative Technology",
    icon: Cpu,
    summary: "Innovative technology-driven solutions for creative projects.",
    what: "Where design thinking and technical capability meet: tools, automations and digital systems built around a creative workflow.",
    who: ["Studios and creative teams", "Businesses scaling production", "Product teams", "Institutions and programmes"],
    deliverables: ["Interactive digital experiences", "Creative workflow automation", "Design systems and tooling", "Technical prototypes"],
    process: ["Problem definition", "Technical direction", "Prototype", "Build and test", "Deploy and document"],
    examples: ["Interactive microsite", "Asset automation pipeline", "Design system build", "Technical prototype"],
  },
  {
    slug: "creative-consultation",
    name: "Creative Consultation",
    icon: Compass,
    summary: "Helping clients turn ideas into practical creative projects.",
    what: "A structured conversation that turns an intention into a scoped, sequenced, buildable project with clear decisions and owners.",
    who: ["Founders and entrepreneurs", "Organisations planning work", "Authors and creators", "Teams stuck between options"],
    deliverables: ["Project definition", "Creative direction brief", "Scope and sequence", "Format recommendation", "Production roadmap"],
    process: ["Listening session", "Clarify objective", "Options and trade-offs", "Recommendation", "Written roadmap"],
    examples: ["Project scoping session", "Creative direction review", "Launch planning", "Portfolio strategy"],
  },
  {
    slug: "digital-media",
    name: "Digital Media",
    icon: MonitorPlay,
    summary: "Creative digital communication, visual storytelling and media production.",
    what: "Photography, motion and interface design working in one visual language across every digital surface.",
    who: ["Brands and businesses", "Publishers", "Campaign teams", "Digital products"],
    deliverables: ["Photography direction", "Motion graphics", "Digital storytelling formats", "Media asset libraries"],
    process: ["Visual direction", "Asset planning", "Production", "Post and assembly", "Distribution-ready delivery"],
    examples: ["Digital media kit", "Motion identity", "Visual story series", "Channel art direction"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export type EcosystemNode = {
  id: string;
  label: string;
  angle: number;
  items: string[];
  blurb: string;
};

export const ecosystem: EcosystemNode[] = [
  { id: "design", label: "Design", angle: -90, blurb: "Visual communication that carries a message clearly.", items: ["Graphic Design", "Visual Identity", "Social Media Design", "Marketing Materials"] },
  { id: "branding", label: "Branding", angle: -50, blurb: "The system that makes an organisation recognisable.", items: ["Brand Strategy", "Logotype & Marks", "Brand Guidelines", "Brand Application"] },
  { id: "writing", label: "Writing", angle: -10, blurb: "Words that hold structure and sound like you.", items: ["Ghostwriting", "Content Writing", "eBooks", "Articles", "Scripts"] },
  { id: "technology", label: "Technology", angle: 30, blurb: "Digital foundations that are fast and maintainable.", items: ["Website Development", "Web Design", "Digital Solutions"] },
  { id: "media", label: "Media", angle: 70, blurb: "Visual storytelling built for digital audiences.", items: ["Content Creation", "Video Production", "AI Video"] },
  { id: "film", label: "Film", angle: 110, blurb: "Narrative work from treatment to final grade.", items: ["Filmmaking", "Direction", "Editing & Post", "Sound & Colour"] },
  { id: "content", label: "Content", angle: 150, blurb: "Formats and systems that keep publishing consistent.", items: ["Social Content", "Campaign Content", "Photography", "Content Systems"] },
  { id: "printing", label: "Printing", angle: 190, blurb: "Production-ready print, correct the first time.", items: ["Stationery", "Brochures & Literature", "Packaging", "Large Format"] },
  { id: "ai", label: "AI", angle: 230, blurb: "AI applied where it genuinely improves the work.", items: ["AI Video Creation", "Generative Design", "Creative Automation"] },
];

export const processStages = [
  { number: "01", name: "Discover", copy: "Understand the idea, audience and objective." },
  { number: "02", name: "Strategize", copy: "Develop the creative direction." },
  { number: "03", name: "Create", copy: "Produce the creative work." },
  { number: "04", name: "Refine", copy: "Review, improve and polish." },
  { number: "05", name: "Deliver", copy: "Deliver the completed solution." },
];

export const labTopics = [
  { title: "Artificial Intelligence", copy: "Testing where AI meaningfully shortens creative production without flattening the work." },
  { title: "Generative Design", copy: "Systems that produce families of design output from a defined set of rules." },
  { title: "AI Video", copy: "Previsualisation, generated footage and faster iteration under human direction." },
  { title: "Digital Storytelling", copy: "Narrative formats built for how people actually read and watch online." },
  { title: "Emerging Technology", copy: "Evaluating new creative tools before they reach client work." },
  { title: "Interactive Media", copy: "Experiences that respond to the person using them." },
  { title: "Creative Automation", copy: "Removing repetitive production steps so more time goes to direction." },
];

export const trustPoints = [
  { title: "Creative Thinking", copy: "Every project starts with the idea, not the template." },
  { title: "Modern Technology", copy: "Current tools, applied with judgement rather than novelty." },
  { title: "Professional Execution", copy: "Defined stages, clear decisions, work delivered to specification." },
  { title: "Multi-Disciplinary Services", copy: "Design, writing, film and technology held by one team." },
  { title: "Client-Focused Solutions", copy: "Work scoped around your objective, not our preferences." },
  { title: "Continuous Innovation", copy: "A standing practice of testing what is new before recommending it." },
];

export const selectorOptions = [
  { id: "brand", label: "A Brand", service: "branding", copy: "We build the full identity system — logotype, colour, typography, imagery and the guidelines that keep it consistent everywhere it appears.", steps: ["Positioning and discovery", "Identity design", "Brand guidelines", "Rollout across print and digital"] },
  { id: "website", label: "A Website", service: "website-development", copy: "A responsive, fast, accessible website designed around what your visitors need to do — and built so your team can maintain it.", steps: ["Structure and requirements", "Design system", "Build and test", "Launch and handover"] },
  { id: "book", label: "A Book", service: "ghostwriting", copy: "From interviews and outline to a finished manuscript, cover design and print-ready or eBook files.", steps: ["Research and interviews", "Outline", "Drafting and editing", "Design and publication files"] },
  { id: "video", label: "A Video", service: "filmmaking", copy: "Treatment, direction, production and post — or an AI-assisted route when the timeline is tight.", steps: ["Treatment and script", "Production plan", "Shoot or generate", "Edit, sound and grade"] },
  { id: "logo", label: "A Logo", service: "branding", copy: "A properly constructed mark with usage rules, file formats and the minimum system needed to apply it well.", steps: ["Brief and references", "Concept directions", "Refinement", "Full file set and usage rules"] },
  { id: "marketing", label: "Marketing Materials", service: "graphic-design", copy: "Campaign artwork and collateral designed as a set, so everything you publish agrees with itself.", steps: ["Campaign brief", "Concept", "Asset production", "Print and digital delivery"] },
  { id: "social", label: "Social Media Content", service: "content-creation", copy: "Repeatable content formats, a template library and a publishing rhythm your team can sustain.", steps: ["Format design", "Production", "Editing and packaging", "Calendar and delivery"] },
  { id: "print", label: "Printed Materials", service: "printing", copy: "Print-ready design and production management, with correct colour, bleed and substrate specification.", steps: ["Specification", "Design", "Proofing", "Production"] },
  { id: "other", label: "Something Else", service: "creative-consultation", copy: "Tell us the idea. A consultation session turns it into a scoped, sequenced project with clear next steps.", steps: ["Listening session", "Clarify the objective", "Options and trade-offs", "Written roadmap"] },
];

export const portfolioCategories = ["All", "Branding", "Design", "Print", "Web", "Writing", "Film", "Content", "AI"];

export const budgetRanges = ["Not sure yet", "Under ₦500,000", "₦500,000 – ₦2,000,000", "₦2,000,000 – ₦5,000,000", "Above ₦5,000,000"];

export const contactMethods = ["Email", "Phone call", "WhatsApp"];
