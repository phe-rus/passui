import { InlineDisclosure } from "@passui/react/inline-disclosure";
import { Button } from "@passui/react/legacy/button";
import { useState } from "react";

export function InlineDisclosureSettings() {
	const [open, setOpen] = useState(false);
	return (
		<div className="w-full max-w-sm">
			<Button
				type="button"
				variant="secondary"
				aria-expanded={open}
				className="w-full justify-start"
				onClick={() => setOpen((value) => !value)}
			>
				Account settings
			</Button>
			<InlineDisclosure open={open}>
				<p className="p-4">
					The following content settles into place with a spring.
				</p>
			</InlineDisclosure>
		</div>
	);
}
