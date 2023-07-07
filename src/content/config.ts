import { defineCollection, reference, z } from "astro:content";

const categories = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    categories: z.array(reference("categories")),
    link: z.string().url(),
    versionFrom: z.any(), // temporary solution to accepting something like 3.11 as a string
    support: z.enum(["native", "emulation", "no", "unknown"]),
    notes: z.string(),
  }),
});

export const collections = { projects, categories };
