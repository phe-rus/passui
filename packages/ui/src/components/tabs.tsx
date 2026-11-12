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

const Context = createContext<zagTabs.Api | null>(null);

function useTabs() {
	const api = useContext(Context);
	if (!api) throw new Error("Tabs parts must be used inside <Tabs>.");
	return api;
}

export interface TabsProps
	extends Omit<zagTabs.Props, "id" | "ids" | "onValueChange"> {
	onValueChange?: (value: string) => void;
	children?: ReactNode;
	className?: string;
}

export function Tabs({
	onValueChange,
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
		<Context.Provider value={api}>
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
	const api = useTabs();
	return (
		<div
			{...api.getListProps()}
			data-slot="tabs-list"
			className={cx(
				"glass relative inline-flex w-fit items-center gap-1 rounded-full p-1",
				className,
			)}
			{...props}
		>
			{/* The lens glides between triggers; Zag measures the selected one. */}
			<span
				{...api.getIndicatorProps()}
				aria-hidden="true"
				data-slot="tabs-indicator"
				className="glass-lens spring-smooth absolute z-0 rounded-full transition-[left,top,width,height] motion-reduce:transition-none"
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
	const api = useTabs();
	return (
		<button
			{...api.getTriggerProps({ value, disabled })}
			data-slot="tabs-trigger"
			className={cx(
				"relative z-10 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-subheadline font-semibold text-label-secondary outline-none transition spring-snappy hover:text-label active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40 data-selected:text-label motion-reduce:transition-none",
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
	const api = useTabs();
	return (
		<div
			{...api.getContentProps({ value })}
			data-slot="tabs-content"
			className={cx("outline-none", className)}
			{...props}
		/>
	);
}
