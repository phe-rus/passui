import { ContextMenuHost, DialogHost, TooltipHost } from "@passui/react";
import { cn } from "@passui/react/cn";
import { IconButton } from "@passui/react/icon-button";
import { CloseIcon, MenuIcon } from "@passui/react/icons";
import { buttonStyle } from "@passui/react/legacy/button";
import { Sheet } from "@passui/react/sheet";
import { Toaster } from "@passui/react/toaster";
import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { DocsSearch } from "./docs-search";
import { PassuiMark } from "./passui-mark";

function Mark() {
	return (
		<Link
			to="/"
			aria-label="Passui home"
			className="flex items-center gap-2 no-underline"
		>
			<PassuiMark />
			<span className="font-display text-title3 text-label font-black tracking-[-0.05em]">
				passui
			</span>
		</Link>
	);
}

const links = [
	{ label: "Features", hash: "components" },
	{ label: "Playground", hash: "playground" },
	{ label: "What's new", hash: "changelog" },
] as const;

type SiteLayoutProps = {
	children: ReactNode;
};

/** The site's frame: a top bar, the page, and a footer. */
export function SiteLayout({ children }: SiteLayoutProps) {
	const location = useLocation({ select: (state) => state.href });
	const top = useRef<HTMLDivElement>(null);
	const [scrolled, setScrolled] = useState(false);
	// the site's links on phones, where the bar has no room for them
	const [menuOpen, setMenuOpen] = useState(false);
	const close = () => setMenuOpen(false);

	useEffect(() => {
		if (location) setMenuOpen(false);
	}, [location]);

	// a marker at the very top: once it leaves view, the bar turns to glass
	useEffect(() => {
		const marker = top.current;
		if (!marker) return;
		const observer = new IntersectionObserver(([entry]) =>
			setScrolled(!entry.isIntersecting),
		);
		observer.observe(marker);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="flex min-h-svh shrink-0 flex-col">
			<a
				href="#site-content"
				className="focus:bg-elevated focus:text-label sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-3 focus:z-50 focus:rounded-lg focus:px-4 focus:py-3 focus:shadow-lg"
			>
				Skip to content
			</a>
			<div ref={top} aria-hidden="true" className="h-px" />
			<header
				className={cn(
					"sticky top-0 z-40 -mt-px transition-[background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none",
					scrolled
						? "glass-bar shadow-[0_1px_0_rgb(0_0_0/0.06)]"
						: "bg-transparent",
				)}
			>
				<div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6 lg:gap-6">
					<Mark />
					<nav
						aria-label="Site"
						className="mx-auto hidden items-center gap-1 md:flex"
					>
						<Link
							to="/docs/$slug"
							params={{ slug: "introduction" }}
							className="text-subheadline text-label-secondary hover:bg-fill/70 hover:text-label rounded-full px-3 py-1.5 no-underline transition-colors"
						>
							Docs
						</Link>
						<Link
							to={"/components"}
							className="text-subheadline text-label-secondary hover:bg-fill/70 hover:text-label rounded-full px-3 py-1.5 no-underline transition-colors"
						>
							Components
						</Link>
						{links.map((link) => (
							<Link
								key={link.hash}
								to="/"
								hash={link.hash}
								className="text-subheadline text-label-secondary hover:bg-fill/70 hover:text-label hidden rounded-full px-3 py-1.5 no-underline transition-colors lg:block"
							>
								{link.label}
							</Link>
						))}
					</nav>
					<div className="ms-auto flex items-center gap-2 md:ms-0">
						<DocsSearch />
						<Link
							to="/docs/$slug"
							params={{ slug: "installation" }}
							className={buttonStyle({
								size: "sm",
							})}
						>
							Get started
						</Link>
					</div>
					<IconButton
						label="Menu"
						variant="ghost"
						size="icon-sm"
						aria-haspopup="dialog"
						aria-expanded={menuOpen}
						className="md:hidden"
						onClick={() => setMenuOpen(true)}
					>
						<MenuIcon size={20} />
					</IconButton>
				</div>
			</header>
			<Sheet open={menuOpen} onClose={close} label="Menu">
				<nav aria-label="Site" className="flex flex-col gap-1 p-4">
					<div className="flex items-center justify-between px-3 pb-2">
						<span className="text-headline text-label font-semibold">
							Passui
						</span>
						<IconButton
							label="Close"
							variant="ghost"
							size="icon-sm"
							onClick={close}
						>
							<CloseIcon size={20} />
						</IconButton>
					</div>
					<Link
						to="/docs/$slug"
						params={{ slug: "introduction" }}
						onClick={close}
						className="text-body text-label hover:bg-fill rounded-3xl px-3 py-3 no-underline"
					>
						Docs
					</Link>
					<Link
						to={"/components"}
						onClick={close}
						className="text-body text-label hover:bg-fill rounded-3xl px-3 py-3 no-underline"
					>
						Components
					</Link>
					{links.map((link) => (
						<Link
							key={link.hash}
							to="/"
							hash={link.hash}
							onClick={close}
							className="text-body text-label hover:bg-fill rounded-3xl px-3 py-3 no-underline"
						>
							{link.label}
						</Link>
					))}
				</nav>
			</Sheet>
			<div
				id="site-content"
				tabIndex={-1}
				className="flex flex-1 flex-col outline-none"
			>
				{children}
			</div>
			<footer className="border-separator/60 border-t">
				<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:px-6">
					<Mark />
					<nav
						aria-label="Footer"
						className="flex flex-wrap gap-x-5 gap-y-2 md:mx-auto"
					>
						<Link
							to={"/components"}
							className="text-footnote text-label-secondary hover:text-label no-underline"
						>
							Components
						</Link>
						{links.map((link) => (
							<Link
								key={link.hash}
								to="/"
								hash={link.hash}
								className="text-footnote text-label-secondary hover:text-label no-underline"
							>
								{link.label}
							</Link>
						))}
					</nav>
					<span className="text-footnote text-label-tertiary">
						© {new Date().getUTCFullYear()} Pherus
					</span>
				</div>
			</footer>
			<Toaster />
			<ContextMenuHost />
			<DialogHost />
			<TooltipHost />
		</div>
	);
}
