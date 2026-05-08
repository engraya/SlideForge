import { z } from "zod";

export const presentationFormSchema = z.object({
  topic: z
    .string()
    .min(3, "Topic must be at least 3 characters")
    .max(200, "Topic must be 200 characters or fewer")
    .trim(),
  numSlides: z
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .min(1, "Minimum 1 slide")
    .max(20, "Maximum 20 slides"),
  language: z.string().min(1, "Please select a language"),
  theme: z.enum(["professional", "minimal", "vibrant"], {
    errorMap: () => ({ message: "Please select a theme" }),
  }),
  layoutPreference: z
    .enum(["Varied", "Text-Heavy", "Image-Focused"])
    .default("Varied"),
});

export type PresentationFormSchema = z.infer<typeof presentationFormSchema>;
