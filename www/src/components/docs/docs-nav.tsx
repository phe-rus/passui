import { LinkIcon } from "@passui/icons/link";
import { cn } from "@passui/react/cn";
import {
	SidebarItemContent,
	SidebarSection,
	sidebarItemClass,
} from "@passui/react/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { getNavigation } from "@/features/catalog/navigation";

/**
 * Brings the current page's row into view inside the sidebar, which scrolls on
 * its own. Only the sidebar moves, never the page.
 */
export function revealActive(scroller: HTMLElement) {
	const row = scroller.querySelector<HTMLElement>('[aria-current="page"]');
	if (!row || scroller.scrollHeight <= scroller.clientHeight) return;
	const item = row.getBoundingClientRect();
	const box = scroller.getBoundingClientRect();
	if (item.top < box.top || item.bottom > box.bottom)
		scroller.scrollTop += item.top - box.top - (box.height - item.height) / 2;
}

const statusDot = {
	preview: "bg-danger",
	updated: "bg-warning",
	new: "bg-success",
} as const;

interface DocsNavProps {
	/** Runs when a row is chosen, so a sheet can close behind it. */
	onNavigate?: () => void;
}

/** One list, shared by the desktop rail and the phone sheet. */
export function DocsNav({ onNavigate }: DocsNavProps) {
	const pathname = useLocation({ select: (location) => location.pathname });
	const navigation = useRef<HTMLElement>(null);
	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			const scroller = navigation.current?.closest<HTMLElement>(
				"[data-docs-scroller]",
			);
			if (pathname && scroller) revealActive(scroller);
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname]);
	return (
		<nav
			ref={navigation}
			aria-label="Docs"
			className="flex flex-col gap-6 p-3 pb-10"
		>
			{getNavigation().map((group) => (
				<SidebarSection key={group.title} title={group.title}>
					<ul className="m-0 flex list-none flex-col gap-px p-0">
						{group.items.map((item) => (
							<li key={item.href} className="min-w-0">
								{item.external ? (
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										title={item.title}
										className={sidebarItemClass(false, "compact")}
									>
										<SidebarItemContent>{item.title}</SidebarItemContent>
										<LinkIcon
											size={12}
											className="text-label-tertiary shrink-0"
										/>
									</a>
								) : (
									<Link
										to={item.href}
										title={item.title}
										onClick={onNavigate}
										activeOptions={{ exact: true, includeSearch: false }}
										activeProps={{
											className: sidebarItemClass(true, "compact"),
											"aria-current": "page",
										}}
										inactiveProps={{
											className: sidebarItemClass(false, "compact"),
										}}
									>
										<SidebarItemContent>{item.title}</SidebarItemContent>
										{item.status ? (
											<span
												role="img"
												aria-label={item.status}
												title={item.status}
												className={cn(
													"size-1.5 shrink-0 rounded-full",
													statusDot[item.status],
												)}
											/>
										) : null}
									</Link>
								)}
							</li>
						))}
					</ul>
				</SidebarSection>
			))}
		</nav>
	);
}
