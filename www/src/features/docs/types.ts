import type { IconProps } from "@passui/react/icons";
import type { ComponentType } from "react";

/** A getting-started page, served at /docs/<slug>. */
export type GuideSlug =
	| "introduction"
	| "installation"
	| "theming"
	| "typeset"
	| "skills";

export type Guide = {
	/** The page's place in the sidebar; Components is its own page. */
	slug: GuideSlug | "components";
	title: string;
	summary: string;
	path: string;
	/** The sidebar icon. */
	icon: ComponentType<IconProps>;
};
