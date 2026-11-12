import { ToastAction } from "../examples/toast/action";
import { ToastPromise } from "../examples/toast/promise";
import { ToastSizes } from "../examples/toast/sizes";
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
			description:
				"Success shows a check, error a cross and loading a spinner. Info and warning use the plain toast.",
			Demo: ToastTypes,
		},
		{
			id: "promise",
			title: "Promise",
			description: "Follows a promise through loading, success and error.",
			Demo: ToastPromise,
		},
		{
			id: "action",
			title: "Action",
			description: "Add one action, such as Undo, beside the message.",
			Demo: ToastAction,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "`sm`, `md` and `lg` scale the pill and its text together.",
			Demo: ToastSizes,
		},
	],
	accessibility: [
		"The region is a live region named `Notifications` (polite), so messages are announced without moving focus; each toast is a `status`.",
		"Hovering the stack pauses every timer and spreads the toasts out.",
		"Swipe or drag a toast up to dismiss it. Toasts also leave on their own after `duration`; `null` keeps one until you dismiss it.",
		"Under reduced motion the toasts fade without the drop and the stretch.",
	],
};
