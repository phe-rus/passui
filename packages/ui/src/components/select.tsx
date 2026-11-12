"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagSelect from "@zag-js/select";
import { type ReactNode, useId, useMemo } from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { useWaterDrop } from "../lib/water-drop";

export interface SelectItem {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectProps
	extends Omit<
		zagSelect.Props<SelectItem>,
		"id" | "ids" | "collection" | "value" | "defaultValue" | "onValueChange"
	> {
	items: SelectItem[];
	value?: string | null;
	defaultValue?: string | null;
	onValueChange?: (value: string | null) => void;
	placeholder?: ReactNode;
	"aria-label"?: string;
	className?: string;
}

/**
 * A single choice from a list. Renders a native hidden `select`, so it submits
 * with its form, and a listbox that opens beside the trigger.
 */
export function Select({
	items,
	value,
	defaultValue,
	onValueChange,
	placeholder = "Select",
	"aria-label": ariaLabel,
	className,
	...props
}: SelectProps) {
	const id = useId();
	const collection = useMemo(
		() =>
			zagSelect.collection({
				items,
				itemToValue: (i) => i.value,
				itemToString: (i) => i.label,
				isItemDisabled: (i) => !!i.disabled,
			}),
		[items],
	);
	const one = (v?: string | null) =>
		v === undefined ? undefined : v ? [v] : [];
	const service = useMachine(zagSelect.machine, {
		id,
		collection,
		value: one(value),
		defaultValue: one(defaultValue),
		onValueChange: ({ value: next }) => onValueChange?.(next[0] ?? null),
		positioning: {
			sameWidth: true,
			placement: "bottom-start",
			offset: { mainAxis: 6 },
		},
		...props,
	});
	const api = zagSelect.connect(service, normalizeProps);
	const drop = useWaterDrop({
		sourceId: api.getTriggerProps().id,
		material: "liquid-glass-dense squircle [--squircle-radius:1.25rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	const selected = api.selectedItems[0] as SelectItem | undefined;
	return (
		<div
			{...api.getRootProps()}
			data-slot="select"
			className={cx("w-full", className)}
		>
			<select {...api.getHiddenSelectProps()} />
			<div {...api.getControlProps()}>
				<button
					{...api.getTriggerProps()}
					aria-label={ariaLabel}
					data-slot="select-trigger"
					className="bg-fill/60 text-footnote text-label focus-visible:ring-accent/70 aria-invalid:ring-danger/70 flex h-8.5 w-full items-center justify-between gap-2 rounded-xl px-3 text-left transition duration-(--duration-fast) outline-none focus-visible:ring-2 disabled:opacity-40 aria-invalid:ring-2 motion-reduce:transition-none"
				>
					<span
						{...api.getValueTextProps()}
						className={selected ? "" : "text-label-tertiary"}
					>
						{selected?.label ?? placeholder}
					</span>
					<svg
						viewBox="0 0 16 16"
						className="text-label-secondary size-3.5 shrink-0 transition-transform data-[state=open]:rotate-180"
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
							data-slot="select-content"
							className="liquid-glass-dense squircle morph-reset spring-smooth max-h-72 origin-(--transform-origin,center) overflow-y-auto p-1.5 transition outline-none [--squircle-radius:1.25rem] data-ending-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:scale-[0.88] data-starting-style:opacity-0 motion-reduce:transition-none"
						>
							{items.map((item) => (
								<div
									key={item.value}
									{...api.getItemProps({ item })}
									data-slot="select-item"
									className="text-footnote text-label data-highlighted:bg-accent/15 flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 data-disabled:opacity-40"
								>
									<span {...api.getItemTextProps({ item })}>{item.label}</span>
									<span
										{...api.getItemIndicatorProps({ item })}
										className="text-accent-text"
									>
										✓
									</span>
								</div>
							))}
						</div>
					</div>
				</Portal>
			) : null}
		</div>
	);
}
