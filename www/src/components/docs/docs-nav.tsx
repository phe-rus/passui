import { LinkIcon } from "@passui/icons/link";
import { cn } from "@passui/react/cn";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
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

export const statusDot = {
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
		<Sidebar ref={navigation} aria-label="Docs" className="gap-6 p-3 pb-10">
			{getNavigation().map((group) => (
				<SidebarGroup key={group.title}>
					<SidebarGroupLabel size="sm">{group.title}</SidebarGroupLabel>
					<SidebarMenu>
						{group.items.map((item) => (
							<SidebarMenuItem key={item.href}>
								{item.external ? (
									<SidebarMenuButton
										size="sm"
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										title={item.title}
										badge={
											<LinkIcon size={12} className="text-label-tertiary" />
										}
									>
										{item.title}
									</SidebarMenuButton>
								) : (
									<SidebarMenuButton
										size="sm"
										title={item.title}
										isActive={pathname === item.href}
										badge={
											item.status ? (
												<span
													role="img"
													aria-label={item.status}
													title={item.status}
													className={cn(
														"block size-1.5 rounded-full",
														statusDot[item.status],
													)}
												/>
											) : undefined
										}
										render={
											<Link
												to={item.href}
												onClick={onNavigate}
												activeOptions={{ exact: true, includeSearch: false }}
											/>
										}
									>
										{item.title}
									</SidebarMenuButton>
								)}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
			<ul
				aria-label="What the dots mean"
				className="text-caption text-label-tertiary m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 px-3"
			>
				{(Object.keys(statusDot) as (keyof typeof statusDot)[]).map(
					(status) => (
						<li key={status} className="flex items-center gap-1.5">
							<span
								aria-hidden
								className={cn("block size-1.5 rounded-full", statusDot[status])}
							/>
							<span className="capitalize">{status}</span>
						</li>
					),
				)}
			</ul>
		</Sidebar>
	);
}
