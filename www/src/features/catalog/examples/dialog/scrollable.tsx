import { Button } from "@passui/react/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@passui/react/dialog";

const terms = [
	"Passui ships as small, separate imports. You pay only for the controls a page uses.",
	"Every control is a native element with Zag.js behind it, so keyboard, focus and screen reader behavior come with it.",
	"Color follows the accent a person chooses. Components take roles, never raw colors, so a new accent reaches every surface at once.",
	"Motion is spring based and respects Reduce Motion. Panels that open from a button grow out of it and drop back into it on close.",
	"Nothing here has copy of its own. Labels come from your app, so translating is yours to do.",
	"Updates are published to npm. Pin a version, read the notes, then move forward when you are ready.",
];

/** A long dialog scrolls inside its panel while the footer stays in reach. */
export function DialogScrollable() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Read the terms
			</DialogTrigger>
			<DialogContent className="max-h-[min(34rem,100%)]">
				<DialogHeader>
					<DialogTitle>Terms of use</DialogTitle>
					<DialogDescription>Scroll to read all of it.</DialogDescription>
				</DialogHeader>
				<div className="text-subheadline text-label-secondary flex flex-col gap-4">
					{[...terms, ...terms].map((paragraph, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: a fixed demo list
						<p key={index}>{paragraph}</p>
					))}
				</div>
				<DialogFooter className="bg-elevated border-separator/60 sticky -bottom-6 -mx-6 mt-2 -mb-6 border-t px-6 py-4">
					<DialogClose render={<Button variant="ghost" />}>Decline</DialogClose>
					<DialogClose render={<Button />}>Accept</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
