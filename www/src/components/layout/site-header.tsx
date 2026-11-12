import { GithubIcon } from "@passui/icons/github";
import { MenuIcon } from "@passui/icons/menu";
import { StarIcon } from "@passui/icons/star";
import { Button, buttonVariants } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@passui/react/sheet";
import { Link, type LinkProps } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DocsSidebar } from "../docs/docs-sidebar";
import { MobileNav } from "./mobile-nav";
import { PassuiMark } from "./passui-mark";
import { SearchDialog } from "./search-dialog";
import { ThemeToggle } from "./theme-toggle";

const compact = new Intl.NumberFormat("en", { notation: "compact" });
type Navigations = {
	label: string;
} & LinkProps;

export function SiteHeader({ stars }: { stars: number | null }) {
	const [open, setOpen] = useState(false);
	const navigation = useMemo<Navigations[]>(() => {
		return [
			{ to: "/docs/$slug", params: { slug: "introduction" }, label: "Docs" },
			{ to: "/docs/components", label: "Components" },
			{ to: "/docs", label: "Templates" },
			{ to: "/docs", label: "Themes" },
			{ to: "/docs", label: "Playground" },
		] satisfies Navigations[];
	}, []);

	return (
		<Sheet
			side="left"
			open={open}
			onOpenChange={({ open: next }) => setOpen(next)}
		>
			<header className="glass-pane bg-accent-soft/70 sticky top-0 z-55 flex border-0!">
				<section
					aria-label="Passui"
					className="flex h-12 w-full items-center justify-between px-5"
				>
					<div className="flex scrollbar-none items-center gap-5">
						<Link
							to="/"
							aria-label="Passui home"
							className="text-headline text-primary flex items-center gap-3 font-semibold"
						>
							Passui
						</Link>

						<nav
							className={cn(
								"order-3 hidden items-center gap-2 md:flex",
								"min-w-0 scrollbar-none",
							)}
						>
							{navigation.map((item) => {
								const { label, ...props } = item;
								return (
									<Link
										key={props.to}
										{...props}
										activeProps={{
											"aria-current": "page",
											className: "text-accent",
										}}
										activeOptions={{ exact: false }}
										className={cn(
											"truncate text-sm font-medium transition-colors",
										)}
									>
										{label}
									</Link>
								);
							})}
						</nav>
					</div>

					<nav className="flex items-center gap-1">
						<SearchDialog />
						<ThemeToggle />
						<a
							href="https://github.com/phe-rus/passui"
							rel="noreferrer"
							aria-label={
								stars === null
									? "Passui on GitHub"
									: `Passui on GitHub, ${stars} ${stars === 1 ? "star" : "stars"}`
							}
							className={cn(
								buttonVariants({ variant: "accent", size: "xs" }),
								"flex items-center!",
							)}
						>
							<GithubIcon size={18} />
							Github
							{stars === null ? null : (
								<span className="text-footnote text-label-secondary flex items-center gap-1">
									<StarIcon size={14} />
									{compact.format(stars)}
								</span>
							)}
						</a>
						<Link
							to="/docs/$slug"
							params={{ slug: "installation" }}
							className={buttonVariants({
								size: "xs",
								className: "ms-1 hidden no-underline sm:inline-flex",
							})}
						>
							Get started
						</Link>
						<SheetTrigger
							render={
								<Button
									variant="ghost"
									size="icon-sm"
									aria-label="Open navigation"
									className="md:hidden"
								/>
							}
						>
							<MenuIcon size={20} />
						</SheetTrigger>
					</nav>
				</section>
			</header>

			<SheetContent className="w-72 overflow-y-auto p-4">
				<SheetTitle className="sr-only">Documentation</SheetTitle>
				<DocsSidebar onNavigate={() => setOpen(false)} />
			</SheetContent>
		</Sheet>
	);
}
