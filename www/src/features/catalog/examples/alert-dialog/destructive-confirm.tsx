import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@passui/react/alert-dialog";
import { Button } from "@passui/react/button";
import { Input } from "@passui/react/input";
import { useState } from "react";

export function AlertDialogDestructiveConfirm() {
	const [name, setName] = useState("");
	return (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="destructive" />}>
				Delete project
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete "Atlas"?</AlertDialogTitle>
					<AlertDialogDescription>
						Type the project name to confirm.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Input
					aria-label="Project name"
					value={name}
					onChange={(event) => setName(event.target.value)}
					placeholder="Atlas"
				/>
				<AlertDialogFooter>
					<AlertDialogCancel render={<Button variant="ghost" />}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						render={
							<Button variant="destructive" disabled={name !== "Atlas"} />
						}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
