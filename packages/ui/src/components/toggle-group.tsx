"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as group from "@zag-js/toggle-group";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
	useLayoutEffect,
	useRef,
} from "react";
import { cx } from "../lib/cx";
import { type ToggleSize, type ToggleVariant, toggleVariants } from "./toggle";

type Style = { variant: ToggleVariant; size: ToggleSize };
const Context = createContext<{
	api: group.Api;
	style: Style;
	single: boolean;
} | null>(null);

function useGroup() {
	const ctx = useContext(Context);
	if (!ctx)
		throw new Error("ToggleGroupItem must be used inside <ToggleGroup>.");
	return ctx;
}

export interface ToggleGroupProps
	extends Omit<group.Props, "id" | "ids" | "onValueChange">,
		Partial<Style> {
	onValueChange?: (value: string[]) => void;
	children?: ReactNode;
	className?: string;
}

/** A row of toggles. `multiple` allows several on at once; otherwise it behaves like a segmented control. */
export function ToggleGroup({
	onValueChange,
	variant = "default",
	size = "default",
	children,
	className,
	...props
}: ToggleGroupProps) {
	const id = useId();
	const service = useMachine(group.machine, {
		id,
		onValueChange: ({ value }) => onValueChange?.(value),
		...props,
	});
	const api = group.connect(service, normalizeProps);
	const root = useRef<HTMLDivElement>(null);
	const single = !props.multiple;
	// Slide one lens under the pressed item, like a segmented control.
	useLayoutEffect(() => {
		const el = root.current;
		const on = el?.querySelector<HTMLElement>("[data-state=on]");
		if (!el) return;
		if (!on) return void el.style.setProperty("--lens-w", "0px");
		el.style.setProperty("--lens-x", `${on.offsetLeft}px`);
		el.style.setProperty("--lens-w", `${on.offsetWidth}px`);
	}, [api.value]);
	return (
		<Context.Provider value={{ api, style: { variant, size }, single }}>
			<div
				{...api.getRootProps()}
				ref={root}
				data-slot="toggle-group"
				className={cx(
					"glass relative inline-flex w-fit items-center gap-1 rounded-full p-1",
					className,
				)}
			>
				{single ? (
					<span
						aria-hidden="true"
						data-slot="toggle-group-indicator"
						className="glass-lens spring-smooth absolute inset-y-1 left-0 z-0 w-(--lens-w,0px) translate-x-(--lens-x,0px) rounded-full transition-[translate,width] motion-reduce:transition-none"
					/>
				) : null}
				{children}
			</div>
		</Context.Provider>
	);
}

export type ToggleGroupItemProps = Omit<ComponentProps<"button">, "value"> & {
	value: string;
	disabled?: boolean;
};

export function ToggleGroupItem({
	value,
	disabled,
	className,
	...props
}: ToggleGroupItemProps) {
	const { api, style, single } = useGroup();
	return (
		<button
			{...api.getItemProps({ value, disabled })}
			data-slot="toggle-group-item"
			className={cx(
				toggleVariants.base,
				toggleVariants.variant[style.variant],
				toggleVariants.size[style.size],
				"relative z-10 hover:bg-transparent data-[state=on]:text-label text-label-secondary active:scale-[0.96] spring-snappy",
				single ? "data-[state=on]:bg-transparent" : "data-[state=on]:bg-fill",
				className,
			)}
			{...props}
		/>
	);
}
