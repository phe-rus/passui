import { IconButton } from "@passui/react/icon-button";
import {
	HeartIcon,
	PlusIcon,
	SettingsIcon,
	TrashIcon,
} from "@passui/react/icons";

export function IconButtonVariants() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<IconButton label="Add" variant="accent">
				<PlusIcon />
			</IconButton>
			<IconButton label="Like" variant="secondary">
				<HeartIcon />
			</IconButton>
			<IconButton label="Settings" variant="outline">
				<SettingsIcon />
			</IconButton>
			<IconButton label="Delete" variant="destructive">
				<TrashIcon />
			</IconButton>
		</div>
	);
}
