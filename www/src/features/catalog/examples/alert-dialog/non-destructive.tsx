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

export function AlertDialogNonDestructive() {
	return (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Publish
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Publish this page?</AlertDialogTitle>
					<AlertDialogDescription>
						Anyone with the link will be able to read it.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel render={<Button variant="ghost" />}>
						Not yet
					</AlertDialogCancel>
					<AlertDialogAction render={<Button />}>Publish</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
