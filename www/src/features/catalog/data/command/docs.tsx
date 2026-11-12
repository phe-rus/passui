import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@passui/react/command";
import { jsxAttribute, jsxText } from "../snippet";
import { defineDocs } from "../types";
import { CommandDialog } from "./examples/command-dialog";
import { CommandKeywords } from "./examples/command-keywords";
import { CommandShowcase } from "./examples/command-showcase";
import { CommandUsage } from "./examples/command-usage";

export const commandDocs = defineDocs<{ placeholder: string; empty: string }>()(
	{
		slug: "command",
		name: "Command",
		importPath: "@passui/react/command",
		controls: {
			placeholder: { kind: "text", default: "Search commands…" },
			empty: { kind: "text", default: "No commands found." },
		},
		render: ({ placeholder, empty }) => (
			<Command className="w-full max-w-sm">
				<CommandInput placeholder={placeholder} />
				<CommandList>
					<CommandEmpty>{empty}</CommandEmpty>
					<CommandItem value="Home">Home</CommandItem>
					<CommandItem value="Documents">Documents</CommandItem>
				</CommandList>
			</Command>
		),
		childrenSnippet: ({ placeholder, empty }) => ({
			imports: [
				'import { CommandInput, CommandList, CommandEmpty, CommandItem } from "@passui/react/command"',
			],
			omit: ["placeholder", "empty"],
			children: `<CommandInput ${jsxAttribute("placeholder", placeholder)} />
<CommandList>
  <CommandEmpty>${jsxText(empty)}</CommandEmpty>
  <CommandItem value="Home">Home</CommandItem>
  <CommandItem value="Documents">Documents</CommandItem>
</CommandList>`,
		}),
		usage: CommandUsage,
		showcase: CommandShowcase,
		examples: [
			{ id: "dialog", component: CommandDialog },
			{ id: "keywords", component: CommandKeywords },
		],
	},
);
