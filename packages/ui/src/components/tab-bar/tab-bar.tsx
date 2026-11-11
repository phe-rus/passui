import { motion, useReducedMotion } from "motion/react";
import { Fragment, type ReactNode, useId } from "react";
import { useMinimizeOnScroll } from "../../hooks/use-minimize-on-scroll";
import { SearchIcon } from "../../icons/icons";
import { cn } from "../../lib/class-names";
import { spring } from "../../motion/transitions";

export interface TabBarTab<Id extends string = string> {
	id: Id;
	label: string;
	icon: ReactNode;
}

/** What a tab's link receives; spread it onto the router's own link. */
export interface TabBarLinkProps {
	className: string;
	"aria-current": "page" | undefined;
	onClick: () => void;
	children: ReactNode;
}

export type TabBarMinimizeBehavior = "platform" | "scroll" | "never";
export type TabBarSize = "sm" | "md" | "lg";

const tabHeights: Record<TabBarSize, string> = {
	sm: "h-9",
	md: "h-11",
	lg: "h-13",
};
const tabMinimizedWidths: Record<TabBarSize, string> = {
	sm: "w-9",
	md: "w-11",
	lg: "w-13",
};
const tabText: Record<TabBarSize, string> = {
	sm: "text-caption",
	md: "text-caption2",
	lg: "text-subheadline",
};
const searchButtonSizes: Record<TabBarSize, string> = {
	sm: "size-10",
	md: "size-12",
	lg: "size-14",
};
const searchIconSizes: Record<TabBarSize, number> = {
	sm: 17,
	md: 19,
	lg: 21,
};

export interface TabBarProps<Tab extends TabBarTab> {
	/** `platform` follows the platform, `scroll` always minimizes, `never` stays expanded. @default "platform" */
	minimizeBehavior?: TabBarMinimizeBehavior;
	tabs: readonly Tab[];
	/** Active tab ID, or null for a destination outside the bar. */
	active: Tab["id"] | null;
	/** Renders your router's link with the supplied appearance and accessibility props. */
	renderLink: (tab: Tab, props: TabBarLinkProps) => ReactNode;
	search?: { label: string; onPress: () => void };
	/** Accessible name for the navigation. */
	label: string;
	/** Tab height, label text, minimized width and search button diameter. @default "md" */
	size?: TabBarSize;
	className?: string;
}

/**
 * The app's main places a thumb's reach away, drawn as iOS 26 draws them: a
 * floating glass capsule of tabs, with Search as its own round button at the
 * trailing end. Scrolling down through content shrinks the capsule to the
 * current tab; scrolling back up, or a tap, restores it. Android shares the
 * glass, but its bar stays full size, as Android's own bars do.
 *
 * Links stay the app's own (`renderLink`), so the bar works with any router.
 */
export function TabBar<Tab extends TabBarTab>({
	tabs,
	active,
	renderLink,
	search,
	label,
	className,
	size = "md",
	minimizeBehavior = "platform",
}: TabBarProps<Tab>) {
	// Scopes the sliding selection to this bar, so two bars on one
	// screen (a docs page, a split view) never trade their highlight.
	const selectionId = `${useId()}-tab-selection`;
	const reducedMotion = useReducedMotion();
	const [scrolledAway, setScrolledAway] = useMinimizeOnScroll();
	// Platform behavior keeps Android expanded; apps can opt into scroll minimization.
	const minimized =
		scrolledAway &&
		active !== null &&
		minimizeBehavior !== "never" &&
		(minimizeBehavior === "scroll" || !onAndroid());
	return (
		<nav
			aria-label={label}
			className={cn(
				"fixed inset-x-4 bottom-[max(14px,env(safe-area-inset-bottom))] z-30 flex items-center gap-3",
				className,
			)}
		>
			<motion.div
				layout={!reducedMotion}
				transition={reducedMotion ? { duration: 0 } : spring.smooth}
				// A tap on the shrunken capsule brings every tab back.
				onClickCapture={(event) => {
					if (!minimized) return;
					event.preventDefault();
					event.stopPropagation();
					setScrolledAway(false);
				}}
				className={cn(
					"glass flex min-w-0 items-center rounded-full p-0.5",
					minimized ? "grow-0" : "grow",
				)}
			>
				{tabs.map((tab) => {
					const current = tab.id === active;
					if (minimized && !current) return null;
					return (
						<Fragment key={tab.id}>
							{renderLink(tab, {
								"aria-current": current ? "page" : undefined,
								// Switching tabs is silent, as on Apple and Android: no haptic.
								onClick: () => {},
								className: cn(
									"duration-fast relative isolate flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-full font-semibold tracking-[0.01em] no-underline transition-[color,transform] active:scale-[0.94]",
									tabHeights[size],
									tabText[size],
									minimized ? tabMinimizedWidths[size] : "flex-1 px-1",
									current ? "text-accent-text" : "text-label-secondary",
								),
								children: (
									<>
										{current && (
											<motion.span
												layoutId={selectionId}
												className="glass-lens absolute inset-0 -z-10 rounded-full"
												transition={
													reducedMotion ? { duration: 0 } : spring.snappy
												}
											/>
										)}
										{tab.icon}
										<span
											className={minimized ? "sr-only" : "max-w-full truncate"}
										>
											{tab.label}
										</span>
									</>
								),
							})}
						</Fragment>
					);
				})}
			</motion.div>
			{search && (
				<button
					type="button"
					aria-label={search.label}
					onClick={search.onPress}
					className={cn(
						"glass text-label duration-fast ms-auto flex shrink-0 items-center justify-center rounded-full transition-transform active:scale-[0.92]",
						searchButtonSizes[size],
					)}
				>
					<SearchIcon size={searchIconSizes[size]} strokeWidth={2} />
				</button>
			)}
		</nav>
	);
}

function onAndroid() {
	return (
		typeof document !== "undefined" &&
		document.documentElement.dataset.os === "android"
	);
}
