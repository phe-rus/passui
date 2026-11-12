import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@passui/react/command";

export function CommandUsage() {
	return (
		<Command className="ring-separator max-w-sm ring-1">
			<CommandInput placeholder="Type a command" aria-label="Command" />
			<CommandList>
				<CommandEmpty>No results.</CommandEmpty>
				<CommandGroup heading="Actions">
					<CommandItem value="new-file">
						New file<CommandShortcut>⌘N</CommandShortcut>
					</CommandItem>
					<CommandItem value="open">
						Open…<CommandShortcut>⌘O</CommandShortcut>
					</CommandItem>
					<CommandItem value="settings" keywords="preferences">
						Settings
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
