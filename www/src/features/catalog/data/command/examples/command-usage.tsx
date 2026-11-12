import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@passui/react/command";
import { toast } from "@passui/react/toast";

export function CommandUsage() {
	return (
		<Command className="w-full max-w-sm">
			<CommandInput placeholder="Search commands…" />
			<CommandList>
				<CommandEmpty>No commands found.</CommandEmpty>
				<CommandGroup heading="Navigation">
					<CommandItem value="Home" onSelect={() => toast("Home selected")}>
						Home
					</CommandItem>
					<CommandItem
						value="Documents"
						onSelect={() => toast("Documents selected")}
					>
						Documents
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
