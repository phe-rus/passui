import { Button } from "@passui/react/legacy/button";
import { Sheet } from "@passui/react/sheet";
import { useRef, useState } from "react";

export function SheetUsage() {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Button
				variant="secondary"
				ref={triggerRef}
				onClick={() => setOpen(true)}
			>
				About this app
			</Button>
			<Sheet
				open={open}
				onClose={() => setOpen(false)}
				label="About this app"
				sourceRef={triggerRef}
			>
				<div className="flex flex-col gap-2 p-6">
					<h2 className="text-title3 text-label font-semibold">Pass</h2>
					<p className="text-callout text-label-secondary">
						Version 2.4. Made in Lisbon.
					</p>
				</div>
			</Sheet>
		</>
	);
}
