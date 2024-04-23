import { defineCollection, reference, z } from "astro:content";

const applications_categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const games_categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const applications = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      type: z.literal("applications"),
      name: z.string(),
      icon: z.string().optional().default("application-icon-white.svg"),
      categories: z.array(reference("applications_categories")),
      link: z.string().url(),
      version_from: z.string().optional(),
      versionFrom: z.string().optional(),
      compatibility: z.enum(["native", "emulation", "no", "unknown"]),
    }),
});

const games = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      type: z.literal("games"),
      name: z.string(),
      icon: z.string().optional().default("gaming-icon-white.svg"),
      categories: z.array(reference("games_categories")),
      publisher: z.string().optional(),
      frame_rate: z.string().optional(),
      device_configuration: z.string().optional(),
      os_version: z.string().optional(),
      driver_id: z.string().optional(),
      date_tested: z.date().optional(),
      compatibility: z.enum(["perfect", "playable", "runs", "unplayable"]),
      compatibility_details: z.string().optional(),
      auto_super_resolution: z
        .object({
          compatibility: z.enum(["yes", "no", "N/A"]),
          enablement: z.enum(["out of box", "opt-in", "N/A"]),
          fps_boost: z.number(),
        })
        .optional(),
      link: z.string().url().optional(),
    }),
});

const user_reports = defineCollection({
  type: "data",
  schema: z.object({
    reporter: z.string().optional().default("Anonymous"),
    project: reference("applications").or(reference("games")),
    device_configuration: z.string().optional(),
    date_tested: z
      .date({ invalid_type_error: "Invalid date format. Must be YYYY-MM-DD" })
      .optional(),
    compatibility_details: z.string(),
  }),
});

export const collections = {
  applications_categories,
  games_categories,
  games,
  applications,
  user_reports,
};
