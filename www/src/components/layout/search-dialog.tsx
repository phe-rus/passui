import { SearchIcon } from "@passui/icons/search";
import { Button } from "@passui/react/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
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
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { registry } from "@/features/components/registry";
import { guides } from "@/features/guides/guides";

/** Docs search: Command inside a Dialog, opened from the header or with Ctrl or Cmd K. */
export function SearchDialog() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen((o) => !o);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	const go = (to: string) => {
		setOpen(false);
		void navigate({ to });
	};

	return (
		<Dialog open={open} onOpenChange={({ open: next }) => setOpen(next)}>
			<DialogTrigger
				render={
					<Button
						variant="ghost"
						size="icon-sm"
						aria-label="Search documentation"
						aria-keyshortcuts="Control+K Meta+K"
					/>
				}
			>
				<SearchIcon size={18} />
			</DialogTrigger>
			<DialogContent className="gap-0 p-0">
				<DialogTitle className="sr-only">Search documentation</DialogTitle>
				<Command>
					<CommandInput
						placeholder="Search components and guides"
						aria-label="Search documentation"
					/>
					<CommandList>
						<CommandEmpty>No results.</CommandEmpty>
						<CommandGroup heading="Guides">
							{guides.map((g) => (
								<CommandItem
									key={g.slug}
									value={g.path}
									keywords={`${g.title} ${g.summary}`}
									onSelect={() => go(g.path)}
								>
									{g.title}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandGroup heading="Components">
							{registry.map((c) => (
								<CommandItem
									key={c.slug}
									value={`/docs/components/${c.slug}`}
									keywords={`${c.name} ${c.summary}`}
									onSelect={() => go(`/docs/components/${c.slug}`)}
								>
									{c.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
