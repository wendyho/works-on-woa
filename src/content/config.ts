import { defineCollection, reference, z } from "astro:content";

const applications_categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});


const projects = defineCollection({
  type: "content",
  schema: ({image}) => z.discriminatedUnion("type", [
    z.object({
      type: z.literal("applications"),
      name: z.string(),
      icon: z.string().optional().default("applicationicon-white.svg"),
      categories: z.array(reference("applications_categories")),
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
    z.object({
      type: z.literal("games"),
      name: z.string(),
      icon: z.string().optional().default("gamingicon-white.svg"),
      categories: z.array(reference("games_categories")),
      publisher: z.string(),
      frame_rate: z.string().optional(),
      compatibility_status: z.string(),
      device_configuration:z.string(),
      status_description: z.string().optional(),
      os_version:z.string().optional(),
      date_tested:z.string(),
      game_type:z.string(),
      overall_status: z.string()


     
    }),
  ])
  
})

const games_categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});



export const collections = {  applications_categories, games_categories, projects};
