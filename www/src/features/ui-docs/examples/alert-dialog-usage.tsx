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

export function AlertDialogUsage() {
	return (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="destructive" />}>
				Delete note
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this note?</AlertDialogTitle>
					<AlertDialogDescription>
						It will be gone for good. This cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel render={<Button variant="ghost" />}>
						Keep it
					</AlertDialogCancel>
					<AlertDialogAction render={<Button variant="destructive" />}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
