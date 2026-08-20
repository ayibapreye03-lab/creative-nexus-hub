/**
 * SINGLE SOURCE OF TRUTH FOR CONTACT DETAILS AND SOCIAL LINKS.
 *
 * whatsappNumber must be digits only, in international format, no "+" and no
 * spaces — e.g. "2349067500968".
 */
export const site = {
  name: "Creative Tech Global Enterprise",
  shortName: "Creative Tech Global",
  tagline: "Where Creativity Meets Technology",
  description:
    "Creative Tech Global Enterprise provides professional creative and digital solutions including branding, graphic design, printing, ghostwriting, websites, filmmaking, content creation and AI-powered creative services.",
  location: "Nigeria",

  email: "ayibapreye03@gmail.com",
  phone: "09067500968",

  /** Digits only, international format. Empty string = button hidden. */
  whatsappNumber: "2349067500968",
  whatsappPlaceholder: "",
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

export const telHref = `tel:+${site.phone.replace(/^0/, "234")}`;
export const mailHref = `mailto:${site.email}`;
