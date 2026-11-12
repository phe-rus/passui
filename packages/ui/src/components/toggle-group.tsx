"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as group from "@zag-js/toggle-group";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cx } from "../lib/cx";
import { type ToggleSize, type ToggleVariant, toggleVariants } from "./toggle";

type Style = { variant: ToggleVariant; size: ToggleSize };
const Context = createContext<{ api: group.Api; style: Style } | null>(null);

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
	return (
		<Context.Provider value={{ api, style: { variant, size } }}>
			<div
				{...api.getRootProps()}
				data-slot="toggle-group"
				className={cx(
					"inline-flex w-fit items-center gap-1 rounded-full bg-fill/60 p-1",
					className,
				)}
			>
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
	const { api, style } = useGroup();
	return (
		<button
			{...api.getItemProps({ value, disabled })}
			data-slot="toggle-group-item"
			className={cx(
				toggleVariants.base,
				toggleVariants.variant[style.variant],
				toggleVariants.size[style.size],
				"data-[state=on]:bg-elevated data-[state=on]:shadow-[0_1px_3px_rgb(0_0_0/0.15)]",
				className,
			)}
			{...props}
		/>
	);
}
