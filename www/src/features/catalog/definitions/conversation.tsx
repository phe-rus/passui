import { ConversationComposer } from "../examples/conversation/composer";
import { ConversationDays } from "../examples/conversation/days";
import { ConversationShowcase } from "../examples/conversation/showcase";
import { ConversationUsage } from "../examples/conversation/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "composer",
			title: "Composer",
			description:
				"Send with the button or Ctrl/Cmd+Enter. The field clears only after onSend resolves, so a failed send keeps the text. Near the limit, remaining words the count.",
			Demo: ConversationComposer,
		},
		{
			id: "days",
			title: "Across days",
			description:
				"A day line when the date changes, and messages a few minutes apart grouped under one name.",
			Demo: ConversationDays,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: ConversationShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: ConversationUsage },
	],
	accessibility: [
		"Pass createdAt as an ISO string, so the day line and grouping work.",
		"Pass translated words for sendLabel and remaining. Passui has no text of its own; day names come from Intl.",
	],
};
