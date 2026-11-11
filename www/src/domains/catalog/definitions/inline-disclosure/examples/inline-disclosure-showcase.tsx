import { useState } from "react";
import { Button } from "@passui/react/button";
import { InlineDisclosure } from "@passui/react/inline-disclosure";

export function InlineDisclosureShowcase() {
	const [open, setOpen] = useState(false);
	return (
		<div className="w-full max-w-md">
			<section aria-label="Profile">
				<div className="p-4">
					<Button
						variant="ghost"
						onClick={() => setOpen((value) => !value)}
						aria-expanded={open}
					>
						Personal information
					</Button>
					<InlineDisclosure open={open}>
						<p className="text-subheadline text-label-secondary pt-3">
							Change what your profile shares with others.
						</p>
					</InlineDisclosure>
				</div>
			</section>
		</div>
	);
}
