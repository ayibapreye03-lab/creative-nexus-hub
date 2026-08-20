import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "./inquiry-schema";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      service: data.service,
      description: data.description,
      budget: data.budget || null,
      deadline: data.deadline || null,
      contact_method: data.contact_method,
    });
    if (error) {
      console.error("[inquiries] insert failed", error.message);
      return { ok: false as const, message: "We couldn't submit your request. Please try again." };
    }
    return { ok: true as const, message: "Request received. We'll be in touch shortly." };
  });
