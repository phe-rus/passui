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

export interface ComboboxProps {
	items: ComboboxItem[];
	value?: string | null;
	defaultValue?: string | null;
	onValueChange?: (value: string | null) => void;
	placeholder?: string;
	/** Shown when the query matches nothing. */
	empty?: ReactNode;
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
	disabled,
	invalid,
	name,
	"aria-label": ariaLabel,
	className,
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
		positioning: {
			sameWidth: true,
			placement: "bottom-start",
			offset: { mainAxis: 6 },
		},
	});
	const api = zagCombobox.connect(service, normalizeProps);
	// The list grows from the whole field, not from the small chevron inside it.
	const drop = useWaterDrop({
		sourceId: api.getControlProps().id,
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
					className="bg-fill/60 text-body text-label placeholder:text-label-tertiary focus-visible:ring-accent/70 aria-invalid:ring-danger/70 h-11 w-full rounded-2xl pr-10 pl-4 outline-none focus-visible:ring-2 disabled:opacity-40 aria-invalid:ring-2"
				/>
				<button
					{...api.getTriggerProps()}
					className="text-label-secondary absolute inset-y-0 right-1 flex w-9 items-center justify-center"
					aria-label="Show options"
				>
					<svg
						viewBox="0 0 16 16"
						className="size-4"
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
							className="liquid-glass-dense squircle morph-reset spring-smooth max-h-72 origin-(--transform-origin,center) overflow-y-auto p-1.5 transition outline-none [--squircle-radius:1.25rem] data-ending-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:scale-[0.88] data-starting-style:opacity-0 motion-reduce:transition-none"
						>
							{filtered.length === 0 ? (
								<div className="text-subheadline text-label-secondary px-3 py-2">
									{empty}
								</div>
							) : (
								filtered.map((item) => (
									<div
										key={item.value}
										{...api.getItemProps({ item })}
										data-slot="combobox-item"
										className="text-subheadline text-label data-highlighted:bg-accent/15 flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 data-disabled:opacity-40"
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
