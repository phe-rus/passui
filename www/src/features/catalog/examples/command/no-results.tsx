import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandList,
} from "@passui/react/command";

export function CommandNoResults() {
	return (
		<Command className="ring-separator max-w-sm ring-1">
			<CommandInput placeholder="Search" aria-label="Search" />
			<CommandList>
				<CommandEmpty>Nothing here yet.</CommandEmpty>
			</CommandList>
		</Command>
	);
}
