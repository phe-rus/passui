"use client";

import * as zagCollapsible from "@zag-js/collapsible";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";

const Context = createContext<zagCollapsible.Api | null>(null);

function useCollapsible() {
	const api = useContext(Context);
	if (!api)
		throw new Error("Collapsible parts must be used inside <Collapsible>.");
	return api;
}

export interface CollapsibleProps
	extends Omit<zagCollapsible.Props, "id" | "ids" | "onOpenChange"> {
	onOpenChange?: (open: boolean) => void;
	children?: ReactNode;
	className?: string;
}

export function Collapsible({
	onOpenChange,
	children,
	className,
	...props
}: CollapsibleProps) {
	const id = useId();
	const service = useMachine(zagCollapsible.machine, {
		id,
		onOpenChange: ({ open }) => onOpenChange?.(open),
		...props,
	});
	const api = zagCollapsible.connect(service, normalizeProps);
	return (
		<Context.Provider value={api}>
			<div
				{...api.getRootProps()}
				data-slot="collapsible"
				className={className}
			>
				{children}
			</div>
		</Context.Provider>
	);
}

export function CollapsibleTrigger({
	render,
	...props
}: ComponentProps<"button"> & { render?: RenderProp }) {
	const api = useCollapsible();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "collapsible-trigger" },
			props,
		),
		render,
	);
}

export function CollapsibleContent({
	className,
	...props
}: ComponentProps<"div">) {
	const api = useCollapsible();
	return (
		<div
			{...api.getContentProps()}
			data-slot="collapsible-content"
			className={cx("collapse-motion", className)}
			{...props}
		/>
	);
}
