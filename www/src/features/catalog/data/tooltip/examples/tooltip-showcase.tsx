import { IconButton } from "@passui/react/icon-button";
import {
	ArchiveIcon,
	ReplyIcon,
	StarIcon,
	TrashIcon,
} from "@passui/react/icons";

const actions = [
	{ label: "Reply", icon: ReplyIcon },
	{ label: "Star", icon: StarIcon },
	{ label: "Archive", icon: ArchiveIcon },
	{ label: "Delete", icon: TrashIcon },
];

export function TooltipShowcase() {
	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-4 rounded-4xl p-5 shadow-sm ring-1">
			<div className="flex items-center justify-between">
				<span className="text-headline text-label font-semibold">Inbox</span>
				<div className="flex gap-1">
					{actions.map((action) => (
						<IconButton key={action.label} label={action.label} variant="ghost">
							<action.icon />
						</IconButton>
					))}
				</div>
			</div>
			<p className="text-callout text-label-secondary m-0">
				Hover an icon to see what it does.
			</p>
		</div>
	);
}
