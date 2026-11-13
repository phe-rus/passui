import { Item, ItemContent, ItemGroup, ItemTitle } from "@passui/react/item";
import { useState } from "react";

const topics = [
	{
		id: "sync",
		title: "How does syncing work?",
		answer:
			"Changes save on the device first, then merge across your others when you are online.",
	},
	{
		id: "backup",
		title: "Where are backups kept?",
		answer: "Encrypted, in the region you chose when you created the account.",
	},
	{
		id: "export",
		title: "Can I take my data with me?",
		answer: "Export everything as plain files from Settings at any time.",
	},
];

export function ItemAccordion() {
	const [openId, setOpenId] = useState<string | null>("sync");

	return (
		<ItemGroup title="Help" className="w-full max-w-sm">
			{topics.map((topic) => (
				<Item
					key={topic.id}
					open={openId === topic.id}
					onOpenChange={(open) => setOpenId(open ? topic.id : null)}
					panel={
						<p className="text-footnote text-label-secondary m-0">
							{topic.answer}
						</p>
					}
				>
					<ItemContent>
						<ItemTitle>{topic.title}</ItemTitle>
					</ItemContent>
				</Item>
			))}
		</ItemGroup>
	);
}
