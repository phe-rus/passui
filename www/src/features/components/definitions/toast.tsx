import { ToastPromise } from "../examples/toast/promise";
import { ToastTypes } from "../examples/toast/types";
import { ToastUsage } from "../examples/toast/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"Render one `Toaster` at the root, then call `toast` anywhere.",
			Demo: ToastUsage,
		},
		{
			id: "types",
			title: "Types",
			description: "Success, error, warning and info set the accent.",
			Demo: ToastTypes,
		},
		{
			id: "promise",
			title: "Promise",
			description: "Follows a promise through loading, success and error.",
			Demo: ToastPromise,
		},
	],
	accessibility: [
		"The toast region is a live region, so messages are announced without moving focus.",
		"Hovering or focusing a toast pauses its timer.",
		"Every toast has a dismiss button.",
	],
};
