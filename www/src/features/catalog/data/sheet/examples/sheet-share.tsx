import { toast } from "@passui/react";
import { copyText } from "@passui/react/clipboard";
import { Button } from "@passui/react/legacy/button";
import { Sheet } from "@passui/react/sheet";
import { Toggle } from "@passui/react/toggle";
import { useRef, useState } from "react";

export function SheetShare() {
	const [open, setOpen] = useState(false);
	const [canEdit, setCanEdit] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Button ref={triggerRef} onClick={() => setOpen(true)}>
				Share
			</Button>
			<Sheet
				open={open}
				onClose={() => setOpen(false)}
				label="Share note"
				sourceRef={triggerRef}
			>
				<div className="flex flex-col gap-5 p-6">
					<h2 className="text-title3 text-label font-semibold">Share note</h2>
					<Toggle
						label="People with the link can edit"
						checked={canEdit}
						onChange={setCanEdit}
					/>
					<div className="flex justify-end gap-2">
						<Button variant="secondary" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="accent"
							onClick={async () => {
								if (await copyText(window.location.href)) {
									setOpen(false);
									toast.success("Link copied");
								} else toast.error("Could not copy the link");
							}}
						>
							Copy link
						</Button>
					</div>
				</div>
			</Sheet>
		</>
	);
}
