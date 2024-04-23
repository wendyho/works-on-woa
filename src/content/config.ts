import { defineCollection, reference, z } from "astro:content";

const applications_categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("applications"),
        name: z.string(),
        icon: z.string().optional().default("applicationicon-white.svg"),
        categories: z.array(reference("applications_categories")),
        link: z.string().url(),
        versionFrom: z.coerce.string(),
        compatibility: z.enum(["native", "emulation", "no", "unknown"]),
      }),
      z.object({
        type: z.literal("games"),
        name: z.string(),
        icon: z.string().optional().default("gamingicon-white.svg"),
        categories: z.array(reference("games_categories")),
        publisher: z.string().optional(),
        frame_rate: z.string().optional(),
        device_configuration: z.string().optional(),
        status_description: z.string().optional(),
        os_version: z.string().optional(),
        date_tested: z
          .date({
            invalid_type_error: "Invalid date format. Must be YYYY-MM-DD",
          })
          .optional(),
        overall_status: z.string(),
        compatibility: z.enum(["perfect", "playable", "runs", "unplayable"]),
        link: z.literal(null).default(null),
      }),
    ]),
});

const games_categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

// Device configuration”, “Date tested”, “Overall status” and “Compatibility details”.
const user_reports = defineCollection({
  type: "data",
  schema: z.object({
    reporter: z.string().optional().default("Anonymous"),
    project: reference("projects"),
    device_configuration: z.string().optional(),
    date_tested: z
      .date({ invalid_type_error: "Invalid date format. Must be YYYY-MM-DD" })
      .optional(),
    overall_status: z.string(),
    compatibility_details: z.string(),
  }),
});

export const collections = {
  applications_categories,
  games_categories,
  projects,
  user_reports,
};
