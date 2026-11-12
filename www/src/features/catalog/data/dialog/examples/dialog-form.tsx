import { toast } from "@passui/react";
import { Dialog } from "@passui/react/dialog";
import { Button } from "@passui/react/legacy/button";
import { TextField } from "@passui/react/text-field";
import { useRef, useState } from "react";

export function DialogForm() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("Pass console");
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Button
				variant="secondary"
				ref={triggerRef}
				onClick={() => setOpen(true)}
			>
				Rename project
			</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Rename project"
				sourceRef={triggerRef}
				onSubmit={(event) => {
					event.preventDefault();
					setOpen(false);
					toast.success(`Renamed to ${name}`);
				}}
				footer={
					<Dialog.Actions
						submitLabel="Rename"
						cancelLabel="Cancel"
						disabled={!name.trim()}
					/>
				}
			>
				<TextField
					label="Name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
			</Dialog>
		</>
	);
}
