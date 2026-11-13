import { LocalesNativeNames } from "../examples/locales/native-names";
import { LocalesShowcase } from "../examples/locales/showcase";
import { LocalesTranslatedPage } from "../examples/locales/translated-page";
import { LocalesUsage } from "../examples/locales/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "native-names",
			title: "Each language in its own name",
			description:
				"Open it to see the list: every language written the way its speakers write it.",
			Demo: LocalesNativeNames,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: LocalesShowcase,
		},
		{
			id: "translated-page",
			title: "Switching a page's language",
			description:
				"The page's words and its lang attribute follow the chosen language.",
			Demo: LocalesTranslatedPage,
		},
		{
			id: "usage",
			title: "Basic",
			description: "A language list that sits where you place it.",
			Demo: LocalesUsage,
		},
	],
	accessibility: [
		"The control has an accessible name from `label`; the list is a listbox with typeahead and arrow keys.",
		"Show each language in its own name: Français, not French.",
	],
};
