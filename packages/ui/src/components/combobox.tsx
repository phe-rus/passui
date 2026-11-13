"use client";

import * as zagCombobox from "@zag-js/combobox";
import { normalizeProps, useMachine } from "@zag-js/react";
import { type ReactNode, useId, useMemo, useState } from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { useWaterDrop } from "../lib/water-drop";

export interface ComboboxItem {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface ComboboxProps
	extends Omit<
		zagCombobox.Props<ComboboxItem>,
		| "id"
		| "ids"
		| "collection"
		| "value"
		| "defaultValue"
		| "onValueChange"
		| "inputValue"
		| "defaultInputValue"
		| "onInputValueChange"
		| "placeholder"
	> {
	items: ComboboxItem[];
	value?: string | null;
	defaultValue?: string | null;
	onValueChange?: (value: string | null) => void;
	placeholder?: string;
	/** Shown when the query matches nothing. */
	empty?: ReactNode;
	/** The accessible name of the chevron button, so apps can translate it. @default "Show options" */
	triggerLabel?: string;
	disabled?: boolean;
	invalid?: boolean;
	name?: string;
	"aria-label"?: string;
	className?: string;
}

/** A searchable single choice. Typing filters the list; arrow keys and Enter pick. */
export function Combobox({
	items,
	value,
	defaultValue,
	onValueChange,
	placeholder = "Search",
	empty = "No results.",
	triggerLabel = "Show options",
	disabled,
	invalid,
	name,
	"aria-label": ariaLabel,
	className,
	...props
}: ComboboxProps) {
	const id = useId();
	const [query, setQuery] = useState("");
	const filtered = useMemo(
		() =>
			items.filter((i) =>
				i.label.toLowerCase().includes(query.trim().toLowerCase()),
			),
		[items, query],
	);
	const collection = useMemo(
		() =>
			zagCombobox.collection({
				items: filtered,
				itemToValue: (i: ComboboxItem) => i.value,
				itemToString: (i: ComboboxItem) => i.label,
				isItemDisabled: (i: ComboboxItem) => !!i.disabled,
			}),
		[filtered],
	);
	const one = (v?: string | null) =>
		v === undefined ? undefined : v ? [v] : [];
	const service = useMachine(zagCombobox.machine, {
		id,
		collection,
		name,
		disabled,
		invalid,
		value: one(value),
		defaultValue: one(defaultValue),
		openOnClick: true,
		inputBehavior: "autohighlight",
		onInputValueChange: ({ inputValue }) => setQuery(inputValue),
		onValueChange: ({ value: next }) => {
			onValueChange?.(next[0] ?? null);
			setQuery("");
		},
		// The list sits below the field so the query stays visible while typing,
		// unlike Select's list, which opens over its trigger. It is as wide as
		// the field, never taller than the room left, and flips when short.
		positioning: {
			sameWidth: true,
			fitViewport: true,
			placement: "bottom-start",
			offset: { mainAxis: 6 },
		},
		...props,
	});
	const api = zagCombobox.connect(service, normalizeProps);
	// The list drops from the field's bottom edge and the field stays put, so
	// the query remains visible while the reader types.
	const drop = useWaterDrop({
		sourceId: api.getControlProps().id,
		keepSource: true,
		material: "liquid-glass-dense squircle [--squircle-radius:1.25rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	return (
		<div
			{...api.getRootProps()}
			data-slot="combobox"
			className={cx("w-full", className)}
		>
			<div {...api.getControlProps()} className="relative">
				<input
					{...api.getInputProps()}
					aria-label={ariaLabel}
					placeholder={placeholder}
					data-slot="combobox-input"
					className="bg-fill/60 text-footnote text-label placeholder:text-label-tertiary focus-visible:ring-accent/70 aria-invalid:ring-danger/70 h-8.5 w-full rounded-xl pr-9 pl-3 transition duration-(--duration-fast) outline-none focus-visible:ring-2 disabled:opacity-40 aria-invalid:ring-2 motion-reduce:transition-none"
				/>
				<button
					{...api.getTriggerProps()}
					className="group text-label-secondary focus-visible:ring-accent/70 absolute inset-y-0 right-1 flex w-9 items-center justify-center rounded-xl outline-none focus-visible:ring-2 disabled:opacity-40"
					aria-label={triggerLabel}
				>
					<svg
						viewBox="0 0 16 16"
						className="size-4 transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180 motion-reduce:transition-none"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m4 6 4 4 4-4" />
					</svg>
				</button>
			</div>
			{mounted ? (
				<Portal>
					<div {...api.getPositionerProps()} className="z-[70]">
						<div
							{...api.getContentProps()}
							{...attrs}
							ref={ref}
							hidden={false}
							data-slot="combobox-content"
							className="liquid-glass-dense squircle morph-reset spring-smooth max-h-[min(18rem,var(--available-height,18rem))] w-max max-w-(--available-width,100vw) min-w-(--reference-width) origin-(--transform-origin,center) overflow-y-auto p-1.5 transition outline-none [--squircle-radius:1.25rem] data-ending-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:scale-[0.88] data-starting-style:opacity-0 data-[side=bottom]:origin-top data-[side=top]:origin-bottom motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100"
						>
							{filtered.length === 0 ? (
								<div className="text-footnote text-label-secondary px-3 py-2">
									{empty}
								</div>
							) : (
								filtered.map((item) => (
									<div
										key={item.value}
										{...api.getItemProps({ item })}
										data-slot="combobox-item"
										className="text-footnote text-label data-highlighted:bg-accent/15 flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 data-disabled:opacity-40"
									>
										<span {...api.getItemTextProps({ item })}>
											{item.label}
										</span>
										<span
											{...api.getItemIndicatorProps({ item })}
											className="text-accent-text"
										>
											✓
										</span>
									</div>
								))
							)}
						</div>
					</div>
				</Portal>
			) : null}
		</div>
	);
}
