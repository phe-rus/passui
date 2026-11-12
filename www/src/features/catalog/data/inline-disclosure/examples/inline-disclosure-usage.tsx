import { InlineDisclosure } from "@passui/react/inline-disclosure";
import { Button } from "@passui/react/legacy/button";
import { useState } from "react";

export function InlineDisclosureUsage() {
	const [open, setOpen] = useState(false);
	return (
		<div className="w-full max-w-sm">
			<Button
				variant="secondary"
				onClick={() => setOpen((value) => !value)}
				aria-expanded={open}
			>
				Edit details
			</Button>
			<InlineDisclosure open={open}>
				<p className="text-subheadline text-label-secondary pt-3">
					Settings appear smoothly beneath the row.
				</p>
			</InlineDisclosure>
		</div>
	);
}
