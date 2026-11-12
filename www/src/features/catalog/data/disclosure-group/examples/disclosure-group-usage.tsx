import { DisclosureGroup } from "@passui/react/disclosure-group";
import { useState } from "react";

export function DisclosureGroupUsage() {
	const [open, setOpen] = useState(false);
	return (
		<DisclosureGroup label="Details" open={open} onOpenChange={setOpen}>
			<p className="text-footnote text-label-secondary">
				More information about this item.
			</p>
		</DisclosureGroup>
	);
}
