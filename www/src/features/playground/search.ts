import { z } from "zod";
import { sizes, variants } from "./button-options";

export const defaultSearch = {
	variant: "default",
	size: "default",
	pending: false,
	disabled: false,
} as const;

/** Unknown or hand-edited values fall back to the defaults instead of erroring. */
export const playgroundSearchSchema = z.object({
	variant: z.enum(variants).default(defaultSearch.variant).catch("default"),
	size: z.enum(sizes).default(defaultSearch.size).catch("default"),
	pending: z.boolean().default(false).catch(false),
	disabled: z.boolean().default(false).catch(false),
});

export type PlaygroundSearch = z.infer<typeof playgroundSearchSchema>;
