"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagSelect from "@zag-js/select";
import { type ReactNode, useId, useMemo } from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import {
	alignSelectedOption,
	positionerSide,
	useAnchorFollow,
	useTriggerAnchor,
	useWaterDrop,
} from "../lib/water-drop";

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
	/** Shown before the value inside the trigger, such as a globe for a language list. */
	icon?: ReactNode;
	"aria-label"?: string;
	className?: string;
}

/**
 * A single choice from a list. Renders a native hidden `select`, so it submits
 * with its form, and a listbox that opens over the trigger with the selected
 * option on the trigger's value.
 */
export function Select({
	items,
	value,
	defaultValue,
	onValueChange,
	placeholder = "Select",
	icon,
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
	const anchor = useTriggerAnchor("bottom-start", 6);
	const service = useMachine(zagSelect.machine, {
		id,
		collection,
		value: one(value),
		defaultValue: one(defaultValue),
		onValueChange: ({ value: next }) => onValueChange?.(next[0] ?? null),
		// The list opens on the trigger and grows to the size it needs, never
		// narrower than the trigger. Without the morph it sits below, as usual.
		positioning: {
			fitViewport: true,
			placement: "bottom-start",
			offset: { mainAxis: 6 },
			getAnchorRect: anchor.getAnchorRect,
		},
		...props,
	});
	const api = zagSelect.connect(service, normalizeProps);
	// The list lands its selected option on the trigger's value, like a native picker.
	anchor.state.shift = () =>
		alignSelectedOption(
			document.getElementById(api.getTriggerProps().id ?? ""),
			document.getElementById(api.getContentProps().id ?? ""),
		);
	useAnchorFollow(
		anchor,
		api.open,
		positionerSide(api.getPositionerProps()),
		api.reposition,
	);
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
					className="group bg-fill/60 text-footnote text-label focus-visible:ring-accent/70 aria-invalid:ring-danger/70 spring-snappy flex h-8.5 w-full items-center justify-between gap-2 rounded-xl px-3 text-left transition outline-none focus-visible:ring-2 active:scale-[0.98] disabled:opacity-40 aria-invalid:ring-2 motion-reduce:transition-none motion-reduce:active:scale-100"
				>
					{icon ? (
						<span
							aria-hidden="true"
							className="text-label-secondary flex shrink-0 items-center"
						>
							{icon}
						</span>
					) : null}
					<span
						{...api.getValueTextProps()}
						className={cx(
							"min-w-0 flex-1 truncate",
							selected ? "" : "text-label-tertiary",
						)}
					>
						{selected?.label ?? placeholder}
					</span>
					<svg
						viewBox="0 0 16 16"
						className="text-label-secondary size-3.5 shrink-0 transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180 motion-reduce:transition-none"
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
							className="liquid-glass-dense squircle morph-reset spring-smooth max-h-[min(18rem,var(--available-height,18rem))] w-max max-w-(--available-width,100vw) min-w-(--reference-width) origin-(--transform-origin,center) overflow-y-auto p-1.5 transition outline-none [--squircle-radius:1.25rem] data-ending-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:scale-[0.88] data-starting-style:opacity-0 motion-reduce:transition-none"
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
