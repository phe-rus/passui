"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagTabs from "@zag-js/tabs";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cx } from "../lib/cx";

/**
 * `glass` is the pill with a gliding lens, `line` is quiet text over an
 * underline, `solid` is a filled track with a raised thumb (a segmented
 * control), and `pill` is bare text with a soft accent chip behind the
 * selection. Every variant also runs vertically with `orientation="vertical"`.
 */
export type TabsVariant = "glass" | "line" | "solid" | "pill";

const listStyles: Record<TabsVariant, string> = {
	glass: "glass w-fit gap-1 rounded-full p-1",
	line: "w-full gap-5 border-b border-separator/60 data-[orientation=vertical]:w-auto data-[orientation=vertical]:gap-1 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-b-0",
	solid: "bg-fill/70 w-fit gap-0.5 rounded-xl p-0.5",
	pill: "w-fit gap-1",
};

const indicatorStyles: Record<TabsVariant, string> = {
	glass: "glass-lens rounded-full",
	line: "bg-accent rounded-full top-auto! -bottom-px h-0.5! data-[orientation=vertical]:top-(--top)! data-[orientation=vertical]:bottom-auto! data-[orientation=vertical]:-left-px data-[orientation=vertical]:h-(--height)! data-[orientation=vertical]:w-0.5!",
	solid:
		"bg-elevated rounded-[10px] shadow-[0_1px_2px_rgb(0_0_0/0.12),0_0_0_0.5px_var(--color-separator)]",
	pill: "bg-accent-soft rounded-full",
};

const triggerStyles: Record<TabsVariant, string> = {
	glass:
		"h-7.5 rounded-full px-3 font-semibold transition spring-snappy active:scale-[0.96]",
	line: "h-9 rounded-md px-0.5 font-medium transition-colors data-[orientation=vertical]:justify-start data-[orientation=vertical]:px-3",
	solid:
		"h-7 rounded-[10px] px-3 font-medium transition spring-snappy active:scale-[0.96]",
	pill: "h-7.5 rounded-full px-3 font-medium transition spring-snappy data-selected:text-accent-text active:scale-[0.96]",
};

const Context = createContext<{
	api: zagTabs.Api;
	variant: TabsVariant;
} | null>(null);

function useTabs() {
	const ctx = useContext(Context);
	if (!ctx) throw new Error("Tabs parts must be used inside <Tabs>.");
	return ctx;
}

export interface TabsProps
	extends Omit<zagTabs.Props, "id" | "ids" | "onValueChange"> {
	onValueChange?: (value: string) => void;
	/** The look of the tab strip. @default "glass" */
	variant?: TabsVariant;
	children?: ReactNode;
	className?: string;
}

export function Tabs({
	onValueChange,
	variant = "glass",
	children,
	className,
	...props
}: TabsProps) {
	const id = useId();
	const service = useMachine(zagTabs.machine, {
		id,
		onValueChange: ({ value }) => onValueChange?.(value),
		...props,
	});
	const api = zagTabs.connect(service, normalizeProps);
	return (
		<Context.Provider value={{ api, variant }}>
			<div
				{...api.getRootProps()}
				data-slot="tabs"
				className={cx(
					"flex flex-col gap-3 data-[orientation=vertical]:flex-row",
					className,
				)}
			>
				{children}
			</div>
		</Context.Provider>
	);
}

export function TabsList({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const { api, variant } = useTabs();
	return (
		<div
			{...api.getListProps()}
			data-slot="tabs-list"
			data-variant={variant}
			className={cx(
				"relative inline-flex items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
				listStyles[variant],
				className,
			)}
			{...props}
		>
			{/* The lens, thumb or underline glides between triggers; Zag measures the selected one. */}
			<span
				{...api.getIndicatorProps()}
				aria-hidden="true"
				data-slot="tabs-indicator"
				className={cx(
					"spring-smooth absolute z-0 transition-[left,top,width,height] motion-reduce:transition-none",
					indicatorStyles[variant],
				)}
			/>
			{children}
		</div>
	);
}

export function TabsTrigger({
	value,
	disabled,
	className,
	...props
}: Omit<ComponentProps<"button">, "value"> & { value: string }) {
	const { api, variant } = useTabs();
	return (
		<button
			{...api.getTriggerProps({ value, disabled })}
			data-slot="tabs-trigger"
			className={cx(
				"relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-footnote text-label-secondary outline-none hover:text-label focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40 data-selected:text-label motion-reduce:transition-none",
				triggerStyles[variant],
				className,
			)}
			{...props}
		/>
	);
}

export function TabsContent({
	value,
	className,
	...props
}: Omit<ComponentProps<"div">, "value"> & { value: string }) {
	const { api } = useTabs();
	return (
		<div
			{...api.getContentProps({ value })}
			data-slot="tabs-content"
			className={cx("outline-none", className)}
			{...props}
		/>
	);
}
