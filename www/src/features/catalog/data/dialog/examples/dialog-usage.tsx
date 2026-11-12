import { Dialog } from "@passui/react/dialog";
import { Button } from "@passui/react/legacy/button";
import { useRef, useState } from "react";

export function DialogUsage() {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Button
				variant="secondary"
				ref={triggerRef}
				onClick={() => setOpen(true)}
			>
				Sign out
			</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Sign out of Pass?"
				description="You can sign back in at any time."
				sourceRef={triggerRef}
				footer={
					<Dialog.Actions
						submitLabel="Sign out"
						cancelLabel="Cancel"
						onConfirm={() => setOpen(false)}
					/>
				}
			/>
		</>
	);
}
