import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sharedSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    socialImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    hidden: z.boolean().optional().default(false),
    // Encryption fields
    encrypted: z.boolean().optional().default(false),
    password: z.string().optional(),
    passwordHint: z.string().optional(),
});

const blog = defineCollection({
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    schema: sharedSchema,
});

const monthly = defineCollection({
    loader: glob({ base: "./src/content/monthly", pattern: "**/*.{md,mdx}" }),
    schema: sharedSchema,
});

const til = defineCollection({
    loader: glob({ base: "./src/content/til", pattern: "**/*.{md,mdx}" }),
    schema: sharedSchema,
});

export const collections = { blog, monthly, til };
