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

/** `glass` is the pill with a gliding lens; `line` is quiet text over an underline. */
export type TabsVariant = "glass" | "line";

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
				className={cx("flex flex-col gap-3", className)}
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
	const line = variant === "line";
	return (
		<div
			{...api.getListProps()}
			data-slot="tabs-list"
			data-variant={variant}
			className={cx(
				line
					? "relative inline-flex w-full items-center gap-5 border-b border-separator/60"
					: "glass relative inline-flex w-fit items-center gap-1 rounded-full p-1",
				className,
			)}
			{...props}
		>
			{/* The lens, or the underline, glides between triggers; Zag measures the selected one. */}
			<span
				{...api.getIndicatorProps()}
				aria-hidden="true"
				data-slot="tabs-indicator"
				className={
					line
						? "spring-smooth bg-accent absolute top-auto! -bottom-px z-0 h-0.5! rounded-full transition-[left,width] motion-reduce:transition-none"
						: "glass-lens spring-smooth absolute z-0 rounded-full transition-[left,top,width,height] motion-reduce:transition-none"
				}
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
				"relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-subheadline text-label-secondary outline-none hover:text-label focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40 data-selected:text-label motion-reduce:transition-none",
				variant === "line"
					? "h-10 rounded-md px-0.5 font-medium transition-colors"
					: "h-9 rounded-full px-4 font-semibold transition spring-snappy active:scale-[0.96]",
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
