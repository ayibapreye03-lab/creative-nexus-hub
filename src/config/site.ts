/**
 * SINGLE SOURCE OF TRUTH FOR CONTACT DETAILS AND SOCIAL LINKS.
 *
 * Replace the placeholder strings below with the official details.
 * Anything left as a bracketed placeholder renders as plain text (not a link),
 * so nothing on the site ever points at an invented address or number.
 *
 * whatsappNumber must be digits only, in international format, no "+" and no
 * spaces — e.g. "2348012345678".
 */
export const site = {
  name: "Creative Tech Global Enterprise",
  shortName: "Creative Tech Global",
  tagline: "Where Creativity Meets Technology",
  description:
    "Creative Tech Global Enterprise provides professional creative and digital solutions including branding, graphic design, printing, ghostwriting, websites, filmmaking, content creation and AI-powered creative services.",
  location: "Nigeria",

  email: "[OFFICIAL EMAIL TO BE ADDED]",
  phone: "[OFFICIAL PHONE TO BE ADDED]",

  /** Digits only, international format. Empty string = button hidden. */
  whatsappNumber: "",
  whatsappPlaceholder: "[OFFICIAL WHATSAPP NUMBER TO BE ADDED]",
  whatsappMessage:
    "Hello Creative Tech Global Enterprise, I would like to discuss a creative project with you.",

  /** Empty string = icon renders disabled with a "link coming soon" title. */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

export function whatsappHref(message: string = site.whatsappMessage) {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
