import { AlertDestructive } from "../examples/alert/destructive";
import { AlertSuccess } from "../examples/alert/success";
import { AlertTitleOnly } from "../examples/alert/title-only";
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
		{
			id: "success",
			title: "Success",
			description: "Confirms something went right, with a check.",
			Demo: AlertSuccess,
		},
		{
			id: "title-only",
			title: "Title only",
			description: "A short note needs no description.",
			Demo: AlertTitleOnly,
		},
	],
	accessibility: [
		'Renders `role="alert"`, so screen readers announce it when it appears.',
		"The icon is decorative and hidden from assistive technology.",
	],
};
