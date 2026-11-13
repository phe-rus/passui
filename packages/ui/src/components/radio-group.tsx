"use client";

import * as radio from "@zag-js/radio-group";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cx } from "../lib/cx";

const Context = createContext<radio.Api | null>(null);

function useRadio() {
	const api = useContext(Context);
	if (!api) throw new Error("RadioGroupItem must be used inside <RadioGroup>.");
	return api;
}

export interface RadioGroupProps
	extends Omit<radio.Props, "id" | "ids" | "onValueChange"> {
	onValueChange?: (value: string | null) => void;
	children?: ReactNode;
	className?: string;
	/** Names the group when there is no visible label. */
	"aria-label"?: string;
}

export function RadioGroup({
	onValueChange,
	children,
	className,
	"aria-label": ariaLabel,
	...props
}: RadioGroupProps) {
	const id = useId();
	const service = useMachine(radio.machine, {
		id,
		onValueChange: ({ value }) => onValueChange?.(value),
		...props,
	});
	const api = radio.connect(service, normalizeProps);
	return (
		<Context.Provider value={api}>
			<div
				{...api.getRootProps()}
				role="radiogroup"
				aria-label={ariaLabel}
				data-slot="radio-group"
				className={cx("grid gap-3", className)}
			>
				{children}
			</div>
		</Context.Provider>
	);
}

export type RadioGroupItemProps = Omit<ComponentProps<"label">, "value"> & {
	value: string;
	disabled?: boolean;
	/**
	 * Draws no radio dot: the children are the whole control, such as a color
	 * swatch. Style them with `group-data-[state=checked]:`.
	 */
	bare?: boolean;
};

/** One choice. Children are its label. */
export function RadioGroupItem({
	value,
	disabled,
	bare,
	children,
	className,
	...props
}: RadioGroupItemProps) {
	const api = useRadio();
	const item = { value, disabled };
	if (bare)
		return (
			<label
				{...api.getItemProps(item)}
				data-slot="radio-group-item"
				className={cx(
					"group cursor-pointer data-disabled:cursor-not-allowed data-disabled:opacity-40",
					className,
				)}
				{...props}
			>
				<input {...api.getItemHiddenInputProps(item)} />
				{children}
			</label>
		);
	return (
		<label
			{...api.getItemProps(item)}
			data-slot="radio-group-item"
			className={cx(
				"group inline-flex cursor-pointer items-center gap-2.5 text-footnote data-disabled:cursor-not-allowed data-disabled:opacity-40",
				className,
			)}
			{...props}
		>
			<input {...api.getItemHiddenInputProps(item)} />
			<span
				{...api.getItemControlProps(item)}
				className="bg-fill spring-snappy group-focus-within:ring-accent/70 data-[state=checked]:bg-accent inline-flex size-5.5 shrink-0 items-center justify-center rounded-full shadow-[inset_0_0_0_0.5px_var(--color-separator)] transition group-focus-within:ring-2 group-active:scale-90 motion-reduce:transition-none motion-reduce:group-active:scale-100"
			>
				<span className="bg-on-accent spring-bouncy size-2 scale-0 rounded-full transition-transform group-data-[state=checked]:scale-100" />
			</span>
			<span {...api.getItemTextProps(item)}>{children}</span>
		</label>
	);
}
