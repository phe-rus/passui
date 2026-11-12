import { Button } from "@passui/react/button";
import { DownloadIcon, MailIcon, TrashIcon } from "@passui/react/icons";

export function ButtonWithIcon() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button variant="accent">
				<MailIcon size={18} />
				Email
			</Button>
			<Button variant="secondary">
				<DownloadIcon size={18} />
				Download
			</Button>
			<Button variant="destructive">
				<TrashIcon size={18} />
				Delete
			</Button>
		</div>
	);
}
