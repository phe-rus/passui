import { TraceAllStates } from "../examples/trace/all-states";
import { TraceOpen } from "../examples/trace/open";
import { TraceStates } from "../examples/trace/states";
import { TraceUsage } from "../examples/trace/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Steps with detail",
			description:
				"Give a step children and it folds open, like a tool call's output.",
			Demo: TraceUsage,
		},
		{
			id: "states",
			title: "States",
			description:
				"`pending`, `running`, `done` and `error`, shown by the dot beside each step.",
			Demo: TraceStates,
		},
		{
			id: "all-states",
			title: "Every state",
			description: "Done, running and waiting rows together.",
			Demo: TraceAllStates,
		},
		{
			id: "open",
			title: "Opened by default",
			description: "Show the detail of the step that matters.",
			Demo: TraceOpen,
		},
	],
	accessibility: [
		"A step with detail is a native `details` element, so it opens with Enter and Space.",
		'Status is shown by colour and the dot\'s fill; say it in the title too when it matters, for example "Failed".',
		"The running pulse is off under reduced motion.",
	],
};
