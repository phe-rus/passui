"use client";

import * as pin from "@zag-js/pin-input";
import { normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { cx } from "../lib/cx";

export interface InputOTPProps
	extends Omit<
		pin.Props,
		| "id"
		| "ids"
		| "value"
		| "defaultValue"
		| "onValueChange"
		| "onValueComplete"
	> {
	/** Number of slots. @default 6 */
	length?: number;
	/** The code so far, as a string. */
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	className?: string;
}

const split = (v: string | undefined, length: number) =>
	v === undefined ? undefined : Array.from({ length }, (_, i) => v[i] ?? "");

/** A one time code field with one box per character. Paste and autofill fill every box. */
export function InputOTP({
	length = 6,
	value,
	defaultValue,
	onValueChange,
	onComplete,
	className,
	...props
}: InputOTPProps) {
	const id = useId();
	const service = useMachine(pin.machine, {
		id,
		otp: true,
		value: split(value, length),
		defaultValue:
			split(defaultValue, length) ?? Array.from({ length }, () => ""),
		onValueChange: ({ valueAsString }) => onValueChange?.(valueAsString),
		onValueComplete: ({ valueAsString }) => onComplete?.(valueAsString),
		...props,
	});
	const api = pin.connect(service, normalizeProps);
	return (
		<div
			{...api.getRootProps()}
			data-slot="input-otp"
			className={cx("flex items-center gap-2", className)}
		>
			<input {...api.getHiddenInputProps()} />
			<div {...api.getControlProps()} className="flex gap-2">
				{Array.from({ length }, (_, index) => (
					<input
						key={index}
						{...api.getInputProps({ index })}
						className="bg-fill/60 text-subheadline text-label focus:ring-accent/70 aria-invalid:ring-danger/70 size-8.5 rounded-xl text-center font-semibold transition outline-none focus:ring-2 disabled:opacity-40 aria-invalid:ring-2"
					/>
				))}
			</div>
		</div>
	);
}
