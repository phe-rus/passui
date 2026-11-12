"use client";

import * as popover from "@zag-js/popover";
import { normalizeProps, useMachine } from "@zag-js/react";
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
import { anchorOnTrigger, useWaterDrop } from "../lib/water-drop";

const Context = createContext<popover.Api | null>(null);

function usePopover() {
	const api = useContext(Context);
	if (!api) throw new Error("Popover parts must be used inside <Popover>.");
	return api;
}

export interface PopoverProps
	extends Omit<popover.Props, "id" | "ids" | "positioning"> {
	/** Where the panel sits against its trigger. Defaults to `bottom`. */
	placement?: popover.Placement;
	/** Gap between trigger and panel, in pixels. Defaults to 8. */
	offset?: number;
	children?: ReactNode;
}

/** Owns the open state and position. Renders no element of its own. */
export function Popover({
	children,
	placement = "bottom",
	offset = 8,
	...props
}: PopoverProps) {
	const id = useId();
	const service = useMachine(popover.machine, {
		id,
		positioning: {
			placement,
			offset: { mainAxis: offset },
			getAnchorRect: anchorOnTrigger(placement, offset),
		},
		...props,
	});
	const api = popover.connect(service, normalizeProps);
	return <Context.Provider value={api}>{children}</Context.Provider>;
}

type PartProps<T extends "button" | "div"> = ComponentProps<T> & {
	/** Render your own element instead of the default one. */
	render?: RenderProp;
};

export function PopoverTrigger({ render, ...props }: PartProps<"button">) {
	const api = usePopover();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "popover-trigger" },
			props,
		),
		render,
	);
}

/** Positions the panel against another element instead of the trigger. */
export function PopoverAnchor({ render, ...props }: PartProps<"div">) {
	const api = usePopover();
	return renderPart(
		"div",
		mergeProps(
			{ ...api.getAnchorProps(), "data-slot": "popover-anchor" },
			props,
		),
		render,
	);
}

/** Closes the popover. Several of these can sit in one panel. */
export function PopoverClose({ render, ...props }: PartProps<"button">) {
	const api = usePopover();
	const { id: _id, ...closeProps } = api.getCloseTriggerProps();
	return renderPart(
		"button",
		mergeProps({ ...closeProps, "data-slot": "popover-close" }, props),
		render,
	);
}

/** The floating panel. Mounts only while open or leaving, and grows from its trigger side. */
export function PopoverContent({
	className,
	render,
	...props
}: PartProps<"div">) {
	const api = usePopover();
	const drop = useWaterDrop({
		sourceId: api.getTriggerProps().id,
		material: "liquid-glass-dense squircle [--squircle-radius:1.5rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	if (!mounted) return null;
	return (
		<Portal>
			<div {...api.getPositionerProps()} className="z-[70]">
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...attrs,
							ref,
							hidden: false,
							"data-slot": "popover-content",
							className: cx(
								"w-72 liquid-glass-dense squircle morph-reset [--squircle-radius:1.5rem] p-4 text-label outline-none transition spring-smooth origin-(--transform-origin,center) data-ending-style:scale-[0.88] data-starting-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:origin-top data-[side=top]:origin-bottom data-[side=left]:origin-right data-[side=right]:origin-left motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
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

export function PopoverTitle({ className, ...props }: ComponentProps<"h2">) {
	const api = usePopover();
	return (
		<h2
			{...api.getTitleProps()}
			data-slot="popover-title"
			className={cx("text-headline font-semibold text-label", className)}
			{...props}
		/>
	);
}

export function PopoverDescription({
	className,
	...props
}: ComponentProps<"p">) {
	const api = usePopover();
	return (
		<p
			{...api.getDescriptionProps()}
			data-slot="popover-description"
			className={cx("text-footnote text-label-secondary", className)}
			{...props}
		/>
	);
}
