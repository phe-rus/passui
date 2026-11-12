import { BoldIcon, ItalicIcon, UnderlineIcon } from "@passui/react/icons";
import { Button } from "@passui/react/legacy/button";

const tools = [
	{ label: "Bold", keys: "⌘B", icon: BoldIcon },
	{ label: "Italic", keys: "⌘I", icon: ItalicIcon },
	{
		label: "Underline",
		keys: "⌘U",
		icon: UnderlineIcon,
	},
];

export function TooltipShortcuts() {
	return (
		<div className="bg-elevated ring-separator/60 flex gap-1 rounded-full p-1 shadow-sm ring-1">
			{tools.map((tool) => (
				<Button
					key={tool.label}
					variant="ghost"
					size="icon-sm"
					aria-label={tool.label}
					data-tooltip={`${tool.label}  ${tool.keys}`}
				>
					<tool.icon size={18} />
				</Button>
			))}
		</div>
	);
}
