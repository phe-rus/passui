import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@passui/react/alert-dialog";
import { Button } from "@passui/react/button";
import { useState } from "react";

/**
 * The new dialogs ship no imperative `confirm()`. Keep the open state in your
 * own component and call `onConfirm` from the action.
 */
export function AlertDialogConfirm() {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState("Nothing deleted yet.");
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Empty trash
			</Button>
			<span className="text-footnote text-label-secondary">{status}</span>
			<AlertDialog
				open={open}
				onOpenChange={(details) => setOpen(details.open)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Empty the trash?</AlertDialogTitle>
						<AlertDialogDescription>
							Everything inside is removed immediately.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel render={<Button variant="ghost" />}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							render={<Button variant="destructive" />}
							onClick={() => setStatus("Trash emptied.")}
						>
							Empty
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
