import { Chip } from "@passui/react";

const notes = [
	{
		title: "Trip to Kyoto",
		detail: "Edited today",
		tone: "friends",
		tag: "Friends",
	},
	{
		title: "Grandma's recipes",
		detail: "Edited yesterday",
		tone: "family",
		tag: "Family",
	},
	{
		title: "Reading list",
		detail: "Edited Monday",
		tone: "public",
		tag: "Public",
	},
	{
		title: "Q4 plan",
		detail: "Edited last week",
		tone: "neutral",
		tag: "Draft",
	},
] as const;

export function ChipShowcase() {
	return (
		<ul className="divide-separator/60 bg-elevated ring-separator/60 m-0 flex w-full max-w-sm list-none flex-col divide-y overflow-hidden rounded-4xl p-0 shadow-sm ring-1">
			{notes.map((note) => (
				<li
					key={note.title}
					className="flex items-center justify-between gap-3 px-5 py-3.5"
				>
					<div className="flex flex-col">
						<span className="text-subheadline text-label font-semibold">
							{note.title}
						</span>
						<span className="text-footnote text-label-secondary">
							{note.detail}
						</span>
					</div>
					<Chip tone={note.tone}>{note.tag}</Chip>
				</li>
			))}
		</ul>
	);
}
