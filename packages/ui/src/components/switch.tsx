"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagSwitch from "@zag-js/switch";
import { type ReactNode, useId } from "react";
import { cx } from "../lib/cx";

export interface SwitchProps
	extends Omit<zagSwitch.Props, "id" | "ids" | "onCheckedChange"> {
	onCheckedChange?: (checked: boolean) => void;
	children?: ReactNode;
	className?: string;
	"aria-label"?: string;
}

/** An on or off switch. Renders a native hidden checkbox with `role="switch"`. */
export function Switch({
	onCheckedChange,
	children,
	className,
	"aria-label": ariaLabel,
	...props
}: SwitchProps) {
	const id = useId();
	const service = useMachine(zagSwitch.machine, {
		id,
		onCheckedChange: ({ checked }) => onCheckedChange?.(checked),
		...props,
	});
	const api = zagSwitch.connect(service, normalizeProps);
	return (
		<label
			{...api.getRootProps()}
			data-slot="switch"
			className={cx(
				"group inline-flex cursor-pointer items-center gap-2.5 text-subheadline data-disabled:cursor-not-allowed data-disabled:opacity-40",
				className,
			)}
		>
			<input
				{...api.getHiddenInputProps()}
				// biome-ignore lint/a11y/useAriaPropsForRole: the native checkbox carries the checked state
				role="switch"
				aria-label={ariaLabel}
			/>
			<span
				{...api.getControlProps()}
				data-slot="switch-control"
				className="bg-fill ease-standard group-focus-within:ring-accent/70 data-[state=checked]:bg-success inline-flex h-8 w-13 shrink-0 items-center rounded-full p-0.5 shadow-[inset_0_0_0_0.5px_var(--color-separator)] transition duration-(--duration-normal) group-focus-within:ring-2 motion-reduce:transition-none"
			>
				<span
					{...api.getThumbProps()}
					data-slot="switch-thumb"
					className="ease-sheet block size-7 rounded-full bg-white shadow-[0_2px_6px_rgb(0_0_0/0.25)] transition-transform duration-(--duration-normal) group-active:scale-x-110 data-[state=checked]:translate-x-5 motion-reduce:transition-none"
				/>
			</span>
			{children ? <span {...api.getLabelProps()}>{children}</span> : null}
		</label>
	);
}
