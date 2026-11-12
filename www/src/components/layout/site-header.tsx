import { buttonVariants } from "@passui/react/button";
import { Link } from "@tanstack/react-router";
import { MobileNav } from "./mobile-nav";
import { PassuiMark } from "./passui-mark";
import { SearchDialog } from "./search-dialog";

const link = buttonVariants({ variant: "ghost", size: "sm" });

export function SiteHeader() {
	return (
		<header className="glass-bar sticky top-0 z-40">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6">
				<MobileNav />
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
				<nav
					aria-label="Site"
					className="ms-4 hidden items-center gap-1 md:flex"
				>
					<Link
						to="/docs/$slug"
						params={{ slug: "introduction" }}
						className={link}
					>
						Docs
					</Link>
					<Link to="/docs/components" className={link}>
						Components
					</Link>
				</nav>
				<div className="ms-auto">
					<SearchDialog />
				</div>
			</div>
		</header>
	);
}
