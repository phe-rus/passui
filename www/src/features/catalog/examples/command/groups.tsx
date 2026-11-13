import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@passui/react/command";

export function CommandGroups() {
	return (
		<Command className="ring-separator max-w-sm ring-1">
			<CommandInput placeholder="Search" aria-label="Search" />
			<CommandList>
				<CommandGroup heading="File">
					<CommandItem value="new">
						New<CommandShortcut>⌘N</CommandShortcut>
					</CommandItem>
					<CommandItem value="save">
						Save<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandGroup heading="View">
					<CommandItem value="zoom-in">
						Zoom in<CommandShortcut>⌘+</CommandShortcut>
					</CommandItem>
					<CommandItem value="zoom-out">
						Zoom out<CommandShortcut>⌘-</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
