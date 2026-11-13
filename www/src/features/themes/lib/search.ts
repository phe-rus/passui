import { accents } from "@passui/react/tokens";
import { z } from "zod";

const ids = Object.keys(accents) as [keyof typeof accents];

export const defaultThemesSearch = { accent: "blush" } as const;

/** The chosen accent lives in the URL, so a theme can be linked. */
export const themesSearchSchema = z.object({
	accent: z.enum(ids).default("blush").catch("blush"),
});
