"use client";

import * as checkbox from "@zag-js/checkbox";
import { normalizeProps, useMachine } from "@zag-js/react";
import { type ComponentProps, type ReactNode, useId } from "react";
import { cx } from "../lib/cx";

export interface CheckboxProps
	extends Omit<
		checkbox.Props,
		"id" | "ids" | "checked" | "defaultChecked" | "onCheckedChange"
	> {
	checked?: boolean | "indeterminate";
	defaultChecked?: boolean | "indeterminate";
	onCheckedChange?: (checked: boolean | "indeterminate") => void;
	/** The label beside the box. Optional, so a bare box can sit in a table cell. */
	children?: ReactNode;
	className?: string;
	"aria-label"?: string;
}

/** A tick box. Renders a native hidden checkbox, so it submits with its form. */
export function Checkbox({
	checked,
	defaultChecked,
	onCheckedChange,
	children,
	className,
	"aria-label": ariaLabel,
	...props
}: CheckboxProps) {
	const id = useId();
	const service = useMachine(checkbox.machine, {
		id,
		checked,
		defaultChecked,
		onCheckedChange: ({ checked: next }) => onCheckedChange?.(next),
		...props,
	});
	const api = checkbox.connect(service, normalizeProps);
	return (
		<label
			{...api.getRootProps()}
			data-slot="checkbox"
			className={cx(
				"group inline-flex cursor-pointer items-center gap-2.5 text-footnote data-disabled:cursor-not-allowed data-disabled:opacity-40",
				className,
			)}
		>
			<input {...api.getHiddenInputProps()} aria-label={ariaLabel} />
			<span
				{...api.getControlProps()}
				data-slot="checkbox-control"
				className="bg-fill text-on-accent spring-snappy group-focus-within:ring-accent/70 data-[state=checked]:bg-accent data-[state=indeterminate]:bg-accent inline-flex size-5.5 shrink-0 items-center justify-center rounded-lg shadow-[inset_0_0_0_0.5px_var(--color-separator)] transition group-focus-within:ring-2 motion-reduce:transition-none"
			>
				<svg
					{...({
						...api.getIndicatorProps(),
						hidden: false,
					} as ComponentProps<"svg">)}
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.25"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="spring-bouncy size-3.5 scale-0 transition-transform group-data-[state=checked]:scale-100 group-data-[state=indeterminate]:scale-100"
					aria-hidden="true"
				>
					{api.indeterminate ? (
						<path d="M4 8h8" />
					) : (
						<path d="m3.5 8.5 3 3 6-7" />
					)}
				</svg>
			</span>
			{children ? <span {...api.getLabelProps()}>{children}</span> : null}
		</label>
	);
}
