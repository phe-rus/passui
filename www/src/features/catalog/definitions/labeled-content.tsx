import { LabeledContentDescriptions } from "../examples/labeled-content/descriptions";
import { LabeledContentShowcase } from "../examples/labeled-content/showcase";
import { LabeledContentUsage } from "../examples/labeled-content/usage";
import { LabeledContentValues } from "../examples/labeled-content/values";
import { LabeledContentWide } from "../examples/labeled-content/wide";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "descriptions",
			title: "With descriptions",
			description:
				"A second line under each label explains the setting, while the control stays at the end of the row.",
			Demo: LabeledContentDescriptions,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: LabeledContentShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: LabeledContentUsage },
		{
			id: "values",
			title: "Read-only values",
			description:
				"Plain text as the trailing content, for details people can read but not change here.",
			Demo: LabeledContentValues,
		},
		{
			id: "wide",
			title: "Wide controls",
			description:
				"wide moves a segmented control under its label on phones, and stacked always puts it underneath.",
			Demo: LabeledContentWide,
		},
	],
	accessibility: [
		"Keep descriptions to one short sentence.",
		"Use stacked for text fields so they get the full width.",
	],
};
