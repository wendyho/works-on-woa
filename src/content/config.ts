import { defineCollection, reference, z } from "astro:content";

const categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    icon: z.string().optional().default("applicationicon-white.svg"),
    categories: z.array(reference("categories")),
    link: z.string().url(),
    versionFrom: z.coerce.string(),
    compatibility: z.enum([
      "native",
      "native (unreleased)",
      "emulation",
      "no",
      "unknown",
    ]),
  }),
});

export const collections = { projects, categories };
