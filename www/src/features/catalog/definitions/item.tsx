import { ItemAccordion } from "../examples/item/accordion";
import { ItemChoice } from "../examples/item/choice";
import { ItemContacts } from "../examples/item/contacts";
import { ItemDisabled } from "../examples/item/disabled";
import { ItemExpandable } from "../examples/item/expandable";
import { ItemGroups } from "../examples/item/groups";
import { ItemIconsAndImages } from "../examples/item/icons-and-images";
import { ItemLinks } from "../examples/item/links";
import { ItemLongText } from "../examples/item/long-text";
import { ItemPressable } from "../examples/item/pressable";
import { ItemSettings } from "../examples/item/settings";
import { ItemSizes } from "../examples/item/sizes";
import { ItemStorage } from "../examples/item/storage";
import { ItemUsage } from "../examples/item/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"Group related settings or details. A title and a footer are both optional.",
			Demo: ItemUsage,
		},
		{
			id: "groups",
			title: "Grouped settings",
			description:
				"Several groups on one screen, with switches and a description, as in iOS Settings.",
			Demo: ItemGroups,
		},
		{
			id: "pressable",
			title: "Rows that act",
			description:
				"`render` turns the whole row into your own button or link, with a destructive action in its own group at the end.",
			Demo: ItemPressable,
		},
		{
			id: "expandable",
			title: "Expand to edit",
			description:
				"`panel` turns a row into a toggle that opens inputs, a select or switches right under it.",
			Demo: ItemExpandable,
		},
		{
			id: "accordion",
			title: "One open at a time",
			description:
				"Control `open` from the group's state and only one row stays expanded.",
			Demo: ItemAccordion,
		},
		{
			id: "icons-and-images",
			title: "Icons and images",
			description:
				"`ItemMedia` leads the row, and the hairline insets past it. `chevron` marks a row that opens something.",
			Demo: ItemIconsAndImages,
		},
		{
			id: "settings",
			title: "A settings screen",
			description:
				"A profile row, then grouped switches, put together the way an app would.",
			Demo: ItemSettings,
		},
		{
			id: "contacts",
			title: "People",
			description:
				"An avatar in `ItemMedia`, a role as the description and the time at the end.",
			Demo: ItemContacts,
		},
		{
			id: "storage",
			title: "Progress and badges",
			description:
				"`ItemContent` holds anything: a figure with a progress bar, or a badge in the actions.",
			Demo: ItemStorage,
		},
		{
			id: "choice",
			title: "Choosing one",
			description:
				"Pressable rows with `aria-pressed` and a check at the end, and the footer follows the choice.",
			Demo: ItemChoice,
		},
		{
			id: "links",
			title: "As links",
			description:
				"Pass an `a` to `render` and the row navigates, with the link's own semantics.",
			Demo: ItemLinks,
		},
		{
			id: "disabled",
			title: "Disabled rows",
			description:
				"A disabled button, or `aria-disabled` on a link, dims the row and stops it reacting.",
			Demo: ItemDisabled,
		},
		{
			id: "long-text",
			title: "Long content",
			description:
				"Titles truncate and descriptions clamp to two lines, so one long row never reshapes the group.",
			Demo: ItemLongText,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "`size` on the group sets row height and text scale.",
			Demo: ItemSizes,
		},
	],
	anatomy: {
		Item: "ItemGroup",
		ItemMedia: "Item",
		ItemContent: "Item",
		ItemActions: "Item",
		ItemTitle: "ItemContent",
		ItemDescription: "ItemContent",
	},
	accessibility: [
		'The group is a `section`, and its rows form a `role="list"` named by the title.',
		"A row given `render` is your own button or link, so it keeps its native role, focus ring and keyboard behavior.",
		"The chevron is decorative and hidden from assistive technology.",
		"A row with a `panel` is a button with `aria-expanded` and `aria-controls`. The panel is a labelled region, and while closed it is `inert`, so its inputs leave the tab order.",
	],
};
