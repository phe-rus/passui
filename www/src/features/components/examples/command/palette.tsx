import { Button } from "@passui/react/button";
import {
	Command,
	CommandInput,
	CommandItem,
	CommandList,
} from "@passui/react/command";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@passui/react/dialog";

export function CommandPalette() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Open palette
			</DialogTrigger>
			<DialogContent className="p-0">
				<DialogTitle className="sr-only">Command palette</DialogTitle>
				<Command>
					<CommandInput placeholder="Search" aria-label="Search" />
					<CommandList>
						<CommandItem value="home">Home</CommandItem>
						<CommandItem value="docs">Docs</CommandItem>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
