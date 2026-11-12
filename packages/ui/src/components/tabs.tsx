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

export function TabsList({ className, ...props }: ComponentProps<"div">) {
	const api = useTabs();
	return (
		<div
			{...api.getListProps()}
			data-slot="tabs-list"
			className={cx(
				"inline-flex w-fit items-center gap-1 rounded-full bg-fill/60 p-1",
				className,
			)}
			{...props}
		/>
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
				"inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-subheadline font-semibold text-label-secondary outline-none transition duration-(--duration-fast) focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40 data-selected:bg-elevated data-selected:text-label data-selected:shadow-[0_1px_3px_rgb(0_0_0/0.15)] motion-reduce:transition-none",
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
