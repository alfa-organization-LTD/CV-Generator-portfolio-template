import { z } from "zod";

// Theme schema
export const ThemeSchema = z.object({
  mode: z.enum(["light", "dark"]),
  colors: z.object({
    background: z.string(),
    surface: z.string(),
    primary: z.string(),
    primary_soft: z.string(),
    accent: z.string(),
    text: z.string(),
    text_muted: z.string(),
    border: z.string(),
  }),
});

export const HeroSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  hero_image_url: z.string().url(),
  hero_image_cover: z.boolean(),
  bio: z.string(),
  phone: z.string(),
  email: z.string().email(),
  cvLink: z.string().url(),
  description: z.string(),
});

export const ServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
});

export const ProfileSchema = z.object({
  user_id: z.string().uuid(),
  site_name: z.string(),
  theme: ThemeSchema,
  logo_url: z.string().url(),
  logo_inverted: z.boolean(),
  Hero: HeroSchema,
  socialLinks: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }),
  services: z.array(ServiceSchema),
  published_at: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
