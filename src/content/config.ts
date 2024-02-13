import { defineCollection, reference, z } from "astro:content";

const applicationscategories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

// const applications = defineCollection({
//   type: "content",
//   schema :({image})=> z.object({
//     name: z.string(),
//     icon: z.string().optional().default("applicationicon-white.svg"),
//     test_image: image().optional(),
//     type: z.string(),
//     categories: z.array(reference("applicationscategories")),
//     link: z.string().url(),
//     versionFrom: z.coerce.string(),
//     compatibility: z.enum([
//       "native",
//       "native (unreleased)",
//       "emulation",
//       "no",
//       "unknown",
//     ]),
//   }),
// });

const projects = defineCollection({
  type: "content",
  schema: ({image}) => z.discriminatedUnion("type", [
    z.object({
      type: z.literal("applications"),
      name: z.string(),
      icon: z.string().optional().default("applicationicon-white.svg"),
      categories: z.array(reference("applicationscategories")),
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
      icon: z.string().optional().default("applicationicon-white.svg"),
      categories: z.array(reference("gamescategories")),
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
  ])
  
})

const gamescategories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

// const games = defineCollection({
//   type: "content",
//   schema: z.object({
//     name: z.string(),
//     icon: z.string().optional().default("applicationicon-white.svg"),
//     categories: z.array(reference("gamescategories")),
//     link: z.string().url(),
//     versionFrom: z.coerce.string(),
//     compatibility: z.enum([
//       "native",
//       "native (unreleased)",
//       "emulation",
//       "no",
//       "unknown",
//     ]),
//   }),
// });

export const collections = {  applicationscategories, gamescategories, projects};
