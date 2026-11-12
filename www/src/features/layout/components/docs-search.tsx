import { Button } from "@passui/react/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@passui/react/command";
import { SearchIcon } from "@passui/react/icons";
import { KeyboardShortcut } from "@passui/react/keyboard-shortcut";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getNavigationCatalog } from "@/features/catalog/lib/get-navigation";
import { componentTitle } from "@/features/catalog/lib/navigation";
import { guides } from "@/features/docs/lib/get-guides";

/** One command-style search entry in the header, shared by all docs pages. */
export function DocsSearch() {
	const [open, setOpen] = useState(false);
	const [shortcut, setShortcut] = useState("Ctrl K");
	const navigate = useNavigate();
	useEffect(() => {
		setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K");
		const onKey = (event: KeyboardEvent) => {
			const target = event.target;
			if (
				(event.ctrlKey || event.metaKey) &&
				event.key.toLowerCase() === "k" &&
				!(
					target instanceof HTMLElement &&
					(target.isContentEditable || target.closest("input,textarea,select"))
				)
			) {
				event.preventDefault();
				setOpen((current) => !current);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<>
			<Button
				type="button"
				size="sm"
				variant="secondary"
				onClick={() => setOpen(true)}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-keyshortcuts="Control+k Meta+k"
				aria-label="Search documentation"
				className="shrink-0 justify-start lg:w-52"
			>
				<SearchIcon size={16} />
				<span className="hidden lg:inline">Search docs…</span>
				<KeyboardShortcut className="ms-auto hidden rounded-full lg:inline-flex">
					{shortcut}
				</KeyboardShortcut>
			</Button>
			<CommandDialog
				open={open}
				onClose={() => setOpen(false)}
				label="Search documentation"
			>
				<CommandInput
					autoFocus
					aria-label="Search documentation"
					placeholder="Search components and guides…"
				/>
				<CommandList>
					<CommandEmpty className="text-footnote text-label-secondary p-6 text-center">
						No results found.
					</CommandEmpty>
					<CommandGroup heading="Guides">
						{guides
							.filter((guide) => guide.slug !== "components")
							.map((guide) => (
								<CommandItem
									key={guide.slug}
									value={guide.title}
									keywords={[guide.summary]}
									onSelect={() => {
										setOpen(false);
										void navigate({
											to: guide.path,
										});
									}}
								>
									{guide.title}
								</CommandItem>
							))}
					</CommandGroup>
					<CommandGroup heading="Components">
						{getNavigationCatalog().map((entry) => (
							<CommandItem
								key={entry.docs.slug}
								value={componentTitle(entry)}
								keywords={[
									entry.group,
									entry.docs.name,
									entry.docs.slug,
									entry.content.summary,
								]}
								onSelect={() => {
									setOpen(false);
									void navigate({
										to: "/components/react/$slug",
										params: {
											slug: entry.docs.slug,
										},
									});
								}}
							>
								<span>{componentTitle(entry)}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
				<p className="text-caption2 text-label-tertiary px-3 pt-3">
					↑ ↓ to navigate · Enter to open · Esc to close
				</p>
			</CommandDialog>
		</>
	);
}
