"use client";

import * as zagAccordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cx } from "../lib/cx";

const Context = createContext<zagAccordion.Api | null>(null);
const ItemContext = createContext<zagAccordion.ItemProps | null>(null);

function useAccordion() {
	const api = useContext(Context);
	const item = useContext(ItemContext);
	if (!api) throw new Error("Accordion parts must be used inside <Accordion>.");
	return { api, item };
}

export interface AccordionProps
	extends Omit<zagAccordion.Props, "id" | "ids" | "onValueChange"> {
	onValueChange?: (value: string[]) => void;
	children?: ReactNode;
	className?: string;
}

/** Stacked disclosures. Single by default, `multiple` lets several stay open. */
export function Accordion({
	onValueChange,
	children,
	className,
	collapsible = true,
	...props
}: AccordionProps) {
	const id = useId();
	const service = useMachine(zagAccordion.machine, {
		id,
		collapsible,
		onValueChange: ({ value }) => onValueChange?.(value),
		...props,
	});
	const api = zagAccordion.connect(service, normalizeProps);
	return (
		<Context.Provider value={api}>
			<div
				{...api.getRootProps()}
				data-slot="accordion"
				className={cx("w-full", className)}
			>
				{children}
			</div>
		</Context.Provider>
	);
}

export function AccordionItem({
	value,
	disabled,
	className,
	...props
}: Omit<ComponentProps<"div">, "value"> & {
	value: string;
	disabled?: boolean;
}) {
	const { api } = useAccordion();
	const item = { value, disabled };
	return (
		<ItemContext.Provider value={item}>
			<div
				{...api.getItemProps(item)}
				data-slot="accordion-item"
				className={cx("border-b border-separator last:border-b-0", className)}
				{...props}
			/>
		</ItemContext.Provider>
	);
}

export function AccordionTrigger({
	className,
	children,
	...props
}: ComponentProps<"button">) {
	const { api, item } = useAccordion();
	if (!item)
		throw new Error("AccordionTrigger must be inside <AccordionItem>.");
	return (
		<h3 className="m-0 flex">
			<button
				{...api.getItemTriggerProps(item)}
				data-slot="accordion-trigger"
				className={cx(
					"flex flex-1 items-center justify-between gap-4 rounded-xl py-4 text-left text-subheadline font-semibold outline-none transition-colors hover:text-label-secondary focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<svg
					viewBox="0 0 16 16"
					className="text-label-secondary spring-snappy size-4 shrink-0 transition-transform motion-reduce:transition-none"
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
		</h3>
	);
}

export function AccordionContent({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const { api, item } = useAccordion();
	if (!item)
		throw new Error("AccordionContent must be inside <AccordionItem>.");
	return (
		<div
			{...api.getItemContentProps(item)}
			data-slot="accordion-content"
			className="text-footnote text-label-secondary collapse-motion"
			{...props}
		>
			<div className={cx("pb-4", className)}>{children}</div>
		</div>
	);
}
