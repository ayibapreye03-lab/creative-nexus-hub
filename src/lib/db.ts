import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

import branding from "@/assets/branding.jpg";
import design from "@/assets/design.jpg";
import print from "@/assets/print.jpg";
import hero from "@/assets/hero.jpg";

export type Project = Tables<"projects">;
export type Article = Tables<"articles">;

const fallbacks: Record<string, string> = {
  Branding: branding,
  Design: design,
  Print: print,
  Web: design,
  Writing: print,
  Film: hero,
  Content: design,
  AI: hero,
};

export function imageFor(row: { image_url: string | null; category: string }) {
  return row.image_url || fallbacks[row.category] || hero;
}

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
});

export const articlesQuery = queryOptions({
  queryKey: ["articles"],
  queryFn: async (): Promise<Article[]> => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});
