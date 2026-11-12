import type { ComponentType } from "react";

export type ComponentGroup =
	| "Forms"
	| "Display"
	| "Navigation"
	| "Overlays"
	| "Feedback"
	| "Layout"
	| "Data";

/** One component in the docs: what navigation, search, the sitemap and llms.txt read. */
export interface ComponentMeta {
	slug: string;
	name: string;
	group: ComponentGroup;
	summary: string;
	/** Built entry name in `@passui/react`, which is also the subpath. Defaults to the slug. */
	entry: string;
	/** Set when the component is not yet rebuilt on Zag and ships as it was. */
	preview?: boolean;
	/** Skip the generated props tables, for components with no entry of their own. */
	api?: false;
}

export interface ExampleDoc {
	/** Matches the file `examples/<slug>/<id>.tsx`, which exports `<Slug><Id>`. */
	id: string;
	title: string;
	description: string;
	Demo: ComponentType;
}

/** The part of a docs page that holds executable demos. Loaded per page. */
export interface ComponentDoc {
	examples: ExampleDoc[];
	accessibility: string[];
}

export interface PropRow {
	name: string;
	type: string;
	default?: string;
	description: string;
	required: boolean;
}

export interface PartApi {
	name: string;
	description: string;
	props: PropRow[];
}
