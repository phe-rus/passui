import { LocaleSwitcherNativeNames } from "../examples/locale-switcher/native-names";
import { LocaleSwitcherShowcase } from "../examples/locale-switcher/showcase";
import { LocaleSwitcherTranslatedPage } from "../examples/locale-switcher/translated-page";
import { LocaleSwitcherUsage } from "../examples/locale-switcher/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "native-names",
			title: "Each language in its own name",
			description:
				"Open it to see the list: every language written the way its speakers write it.",
			Demo: LocaleSwitcherNativeNames,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: LocaleSwitcherShowcase,
		},
		{
			id: "translated-page",
			title: "Switching a page's language",
			description:
				"The page's words and its lang attribute follow the chosen language.",
			Demo: LocaleSwitcherTranslatedPage,
		},
		{ id: "usage", title: "Usage", description: "", Demo: LocaleSwitcherUsage },
	],
	accessibility: [
		"Give each app its own storageKey, so positions don't clash.",
		"Show each language in its own name: Français, not French.",
	],
};
