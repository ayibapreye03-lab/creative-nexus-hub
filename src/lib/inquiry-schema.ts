import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Choose a service").max(80),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a little more (20 characters minimum)")
    .max(4000),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  deadline: z.string().trim().max(60).optional().or(z.literal("")),
  contact_method: z.string().trim().min(1).max(40),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
