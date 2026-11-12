import type { ComponentContent } from "../../types";
import type { comboBoxDocs } from "..";
export const comboBoxContent: ComponentContent<typeof comboBoxDocs> = {
	summary:
		"A searchable Picker with the same control, glass surface and keyboard behavior. Optionally offer creation from a new query.",
	usage:
		"A searchable Picker with the same control, glass surface and keyboard behavior. Optionally offer creation from a new query.",
	propDescriptions: {
		label: "Localized label describing the control or loading state.",
	},
	examples: {
		create: {
			title: "Find or add a team",
			description:
				"Search existing teams or create a new option from the typed query. The application owns the new value.",
		},
		languages: {
			title: "A short list",
			description:
				"A searchable Picker with the same control, glass surface and keyboard behavior. Optionally offer creation from a new query.",
		},
		disabled: {
			title: "Unavailable selection",
			description:
				"A searchable Picker with the same control, glass surface and keyboard behavior. Optionally offer creation from a new query.",
		},
	},
	anatomy: [
		{
			element: "Content",
			description:
				"A searchable Picker with the same control, glass surface and keyboard behavior. Optionally offer creation from a new query.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Use concise, localized labels that describe the current context.",
		},
	],
	accessibility: [
		"Labels and values remain available to assistive technologies.",
	],
};
