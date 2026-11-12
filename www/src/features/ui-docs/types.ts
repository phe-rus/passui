import type { ComponentType } from "react";

export interface PropRow {
	name: string;
	type: string;
	default?: string;
	description: string;
}

export interface PartDoc {
	/** The exported name, such as `DialogContent`. */
	name: string;
	description: string;
	props?: PropRow[];
}

export interface ExampleDoc {
	/** Matches the file `examples/<slug>-<id>.tsx`. */
	id: string;
	title: string;
	description: string;
	Demo: ComponentType;
}

export interface UiDoc {
	slug: string;
	name: string;
	group: string;
	/** A key of `catalogIcons`, used by the sidebar. */
	icon: string;
	summary: string;
	/** Subpath of `@passui/react`, for example `@passui/react/dialog`. */
	entry: string;
	/** Gzip budget in KB, from `size-budgets.json`. */
	sizeKb: number;
	parts: PartDoc[];
	examples: ExampleDoc[];
	accessibility: string[];
}

/** What the sidebar and search need, with no executable demos. */
export interface UiDocMeta {
	slug: string;
	name: string;
	group: string;
	icon: string;
	summary: string;
	exampleIds: string[];
}

/** Server highlighted HTML for one page. */
export interface DocCode {
	install: string;
	examples: Record<string, string>;
}
