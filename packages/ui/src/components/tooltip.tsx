"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as tooltip from "@zag-js/tooltip";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";

const Context = createContext<tooltip.Api | null>(null);

function useTooltip() {
	const api = useContext(Context);
	if (!api) throw new Error("Tooltip parts must be used inside <Tooltip>.");
	return api;
}

export interface TooltipProps
	extends Omit<tooltip.Props, "id" | "ids" | "positioning"> {
	/** Where the tip sits against its trigger. Defaults to `top`. */
	placement?: tooltip.Placement;
	/** Gap between trigger and tip, in pixels. Defaults to 6. */
	offset?: number;
	children?: ReactNode;
}

/**
 * Opens on hover and keyboard focus only, never on touch. After one tip opens,
 * its neighbours open without the delay (Zag shares that warm-up window).
 */
export function Tooltip({
	children,
	placement = "top",
	offset = 6,
	...props
}: TooltipProps) {
	const id = useId();
	const service = useMachine(tooltip.machine, {
		id,
		positioning: { placement, offset: { mainAxis: offset } },
		...props,
	});
	const api = tooltip.connect(service, normalizeProps);
	return <Context.Provider value={api}>{children}</Context.Provider>;
}

export function TooltipTrigger({
	render,
	...props
}: ComponentProps<"button"> & { render?: RenderProp }) {
	const api = useTooltip();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "tooltip-trigger" },
			props,
		),
		render,
	);
}

export function TooltipContent({
	className,
	render,
	...props
}: ComponentProps<"div"> & { render?: RenderProp }) {
	const api = useTooltip();
	const { ref, mounted, attrs } = usePresence(api.open);
	if (!mounted) return null;
	return (
		<Portal>
			<div {...api.getPositionerProps()} className="z-[80]">
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...attrs,
							ref,
							hidden: false,
							"data-slot": "tooltip-content",
							className: cx(
								"pointer-events-none max-w-64 rounded-md bg-inverse px-2.5 py-1.5 text-center text-caption leading-tight font-medium text-on-inverse shadow-lg transition duration-(--duration-fast,150ms) ease-standard data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:scale-95 data-starting-style:scale-95 motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
								className,
							),
						},
						props,
					),
					render,
				)}
			</div>
		</Portal>
	);
}
