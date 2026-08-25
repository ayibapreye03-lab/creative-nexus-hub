import { MessageCircle } from "lucide-react";
import { preferredWhatsappHref, whatsappHref } from "@/config/site";

export function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(event) => {
        const preferredHref = preferredWhatsappHref();
        if (preferredHref && preferredHref !== href) {
          event.preventDefault();
          window.location.href = preferredHref;
        }
      }}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      style={{ width: "3.25rem", height: "3.25rem" }}
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
