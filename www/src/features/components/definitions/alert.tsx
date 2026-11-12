import { AlertDestructive } from "../examples/alert/destructive";
import { AlertUsage } from "../examples/alert/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "An icon first takes its own column.",
			Demo: AlertUsage,
		},
		{
			id: "destructive",
			title: "Destructive",
			description: "For errors the person must act on.",
			Demo: AlertDestructive,
		},
	],
	accessibility: [
		'Renders `role="alert"`, so screen readers announce it when it appears.',
		"The icon is decorative and hidden from assistive technology.",
	],
};
