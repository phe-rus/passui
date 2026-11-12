"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagSlider from "@zag-js/slider";
import { useId } from "react";
import { cx } from "../lib/cx";

export interface SliderProps
	extends Omit<
		zagSlider.Props,
		"id" | "ids" | "value" | "defaultValue" | "onValueChange"
	> {
	value?: number | number[];
	defaultValue?: number | number[];
	onValueChange?: (value: number[]) => void;
	className?: string;
}

const toArray = (v?: number | number[]) =>
	v === undefined ? undefined : Array.isArray(v) ? v : [v];

/** A draggable range control. Pass an array for two or more thumbs. */
export function Slider({
	value,
	defaultValue,
	onValueChange,
	className,
	...props
}: SliderProps) {
	const id = useId();
	const service = useMachine(zagSlider.machine, {
		id,
		value: toArray(value),
		defaultValue:
			toArray(defaultValue) ??
			(value === undefined ? [props.min ?? 0] : undefined),
		onValueChange: ({ value: next }) => onValueChange?.(next),
		...props,
	});
	const api = zagSlider.connect(service, normalizeProps);
	return (
		<div
			{...api.getRootProps()}
			data-slot="slider"
			className={cx("w-full data-disabled:opacity-40", className)}
		>
			<div
				{...api.getControlProps()}
				className="relative flex h-8 w-full touch-none items-center"
			>
				<div
					{...api.getTrackProps()}
					className="bg-fill h-2 w-full overflow-hidden rounded-full"
				>
					<div
						{...api.getRangeProps()}
						className="bg-accent h-full rounded-full"
					/>
				</div>
				{api.value.map((_, index) => (
					<div
						key={index}
						{...api.getThumbProps({ index })}
						className="focus-visible:ring-accent/70 size-7 rounded-full bg-white shadow-[0_1px_4px_rgb(0_0_0/0.3)] transition-transform duration-(--duration-fast) outline-none focus-visible:ring-2 data-dragging:scale-110 motion-reduce:transition-none"
					>
						<input {...api.getHiddenInputProps({ index })} />
					</div>
				))}
			</div>
		</div>
	);
}
