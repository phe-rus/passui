"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagSwitch from "@zag-js/switch";
import { type CSSProperties, type ReactNode, useId } from "react";
import { cx } from "../lib/cx";
import { haptic } from "../lib/haptics";

export type SwitchSize = "sm" | "md" | "lg";
export type SwitchVariant = "default" | "liquid";
export type SwitchTone = "accent" | "success";

/** Track height, track width and padding in px; the thumb is the height minus both paddings. */
const metrics: Record<SwitchSize, { h: number; w: number; pad: number }> = {
	sm: { h: 24, w: 40, pad: 2 },
	md: { h: 32, w: 52, pad: 2 },
	lg: { h: 38, w: 62, pad: 3 },
};

export interface SwitchProps
	extends Omit<zagSwitch.Props, "id" | "ids" | "onCheckedChange"> {
	onCheckedChange?: (checked: boolean) => void;
	children?: ReactNode;
	className?: string;
	"aria-label"?: string;
	/** Track height, width and thumb. @default "md" */
	size?: SwitchSize;
	/** `liquid` lets a second drop of glass chase the thumb through a goo filter, so it stretches as it travels. @default "default" */
	variant?: SwitchVariant;
	/** The colour of the switched on track. `accent` follows the chosen accent. @default "accent" */
	tone?: SwitchTone;
}

/** An on or off switch. Renders a native hidden checkbox with `role="switch"`. */
export function Switch({
	onCheckedChange,
	children,
	className,
	"aria-label": ariaLabel,
	size = "md",
	variant = "default",
	tone = "accent",
	...props
}: SwitchProps) {
	const id = useId();
	const gooId = `${id.replaceAll(":", "")}-goo`;
	const service = useMachine(zagSwitch.machine, {
		id,
		onCheckedChange: ({ checked }) => {
			haptic("selection");
			onCheckedChange?.(checked);
		},
		...props,
	});
	const api = zagSwitch.connect(service, normalizeProps);
	const { h, w, pad } = metrics[size];
	const thumb = h - pad * 2;
	const style = {
		"--sw-h": `${h}px`,
		"--sw-w": `${w}px`,
		"--sw-pad": `${pad}px`,
		"--sw-thumb": `${thumb}px`,
		"--sw-travel": `${w - h}px`,
	} as CSSProperties;
	const liquid = variant === "liquid";
	return (
		<label
			{...api.getRootProps()}
			data-slot="switch"
			data-size={size}
			data-variant={variant}
			className={cx(
				"group text-footnote inline-flex cursor-pointer items-center gap-2.5 data-disabled:cursor-not-allowed data-disabled:opacity-40",
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
				style={style}
				className={cx(
					"bg-fill spring-smooth group-focus-within:ring-accent/70 relative inline-flex h-(--sw-h) w-(--sw-w) shrink-0 items-center rounded-full shadow-[inset_0_0_0_0.5px_var(--color-separator)] transition-[background-color,box-shadow] group-focus-within:ring-2 motion-reduce:transition-none",
					tone === "accent"
						? "data-[state=checked]:bg-accent"
						: "data-[state=checked]:bg-success",
				)}
			>
				{liquid ? (
					<svg
						aria-hidden="true"
						focusable="false"
						width="0"
						height="0"
						className="absolute"
					>
						<filter id={gooId} x="-20%" y="-50%" width="140%" height="200%">
							<feGaussianBlur in="SourceGraphic" stdDeviation={thumb / 5} />
							<feColorMatrix
								type="matrix"
								values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
							/>
						</filter>
					</svg>
				) : null}
				{/* The goo filter acts on this layer alone, so the track keeps its edge. */}
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
					style={liquid ? { filter: `url(#${gooId})` } : undefined}
				>
					{liquid ? (
						<span
							data-slot="switch-drop"
							className="spring-smooth absolute top-(--sw-pad) left-(--sw-pad) block size-(--sw-thumb) translate-x-0 rounded-full bg-white transition-transform delay-75 duration-500 group-data-[state=checked]:translate-x-(--sw-travel) motion-reduce:transition-none"
						/>
					) : null}
					<span
						{...api.getThumbProps()}
						data-slot="switch-thumb"
						className={cx(
							"spring-bouncy absolute top-(--sw-pad) left-(--sw-pad) block size-(--sw-thumb) rounded-full bg-white transition-[translate,width] motion-reduce:transition-none",
							liquid
								? "translate-x-0 data-[state=checked]:translate-x-(--sw-travel)"
								: "shadow-[0_2px_6px_rgb(0_0_0/0.25)] translate-x-0 group-active:w-[calc(var(--sw-thumb)*1.22)] data-[state=checked]:translate-x-(--sw-travel) group-active:data-[state=checked]:translate-x-[calc(var(--sw-travel)-var(--sw-thumb)*0.22)]",
						)}
					/>
				</span>
			</span>
			{children ? <span {...api.getLabelProps()}>{children}</span> : null}
		</label>
	);
}
