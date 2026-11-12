import {
	Command,
	CommandInput,
	CommandList,
	CommandGroup,
	CommandItem,
	CommandEmpty,
	CommandShortcut,
} from "@passui/react/command";
import { HomeIcon, FolderIcon, CopyIcon, PlusIcon } from "@passui/react/icons";
import { toast } from "@passui/react/toast";

export function CommandShowcase() {
	return (
		<Command className="w-full max-w-sm">
			<CommandInput placeholder="Type a command or search…" />
			<CommandList>
				<CommandEmpty>No commands found.</CommandEmpty>
				<CommandGroup heading="Navigation">
					<CommandItem value="Home" onSelect={() => toast("Home selected")}>
						<HomeIcon />
						Home<CommandShortcut>⌘ H</CommandShortcut>
					</CommandItem>
					<CommandItem
						value="Documents"
						onSelect={() => toast("Documents selected")}
					>
						<FolderIcon />
						Documents<CommandShortcut>⌘ D</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandGroup heading="Actions">
					<CommandItem
						value="New document"
						keywords={["create", "file"]}
						onSelect={() => toast("Document created")}
					>
						<PlusIcon />
						New document<CommandShortcut>⌘ N</CommandShortcut>
					</CommandItem>
					<CommandItem value="Copy" onSelect={() => toast("Copy selected")}>
						<CopyIcon />
						Copy<CommandShortcut>⌘ C</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
