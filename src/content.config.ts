import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/notes" }),
});

export const collections = { notes };
