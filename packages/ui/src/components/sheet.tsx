"use client";

import * as drawer from "@zag-js/drawer";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
	useRef,
} from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";
import { useVisualViewportVars } from "../lib/visual-viewport";
import { useWaterDrop } from "../lib/water-drop";

export type SheetSide = "top" | "right" | "bottom" | "left";

const Context = createContext<{ api: drawer.Api; side: SheetSide } | null>(
	null,
);

function useSheet() {
	const ctx = useContext(Context);
	if (!ctx) throw new Error("Sheet parts must be used inside <Sheet>.");
	return ctx;
}

/** Physical side to the direction that dismisses it, honouring right to left. */
function swipeToDismiss(side: SheetSide, rtl: boolean): drawer.SwipeDirection {
	if (side === "top") return "up";
	if (side === "bottom") return "down";
	return (side === "right") !== rtl ? "end" : "start";
}

export interface SheetProps
	extends Omit<
		drawer.Props,
		| "id"
		| "ids"
		| "role"
		| "stack"
		| "swipeDirection"
		| "snapPoint"
		| "snapPoints"
		| "defaultSnapPoint"
	> {
	/** Which edge the sheet slides from. */
	side?: SheetSide;
	children?: ReactNode;
}

/** A panel that slides in from any edge and swipes away. Renders no element of its own. */
export function Sheet({ children, side = "right", ...props }: SheetProps) {
	const id = useId();
	const service = useMachine(drawer.machine, {
		id,
		swipeDirection: swipeToDismiss(side, props.dir === "rtl"),
		...props,
	});
	const api = drawer.connect(service, normalizeProps);
	return <Context.Provider value={{ api, side }}>{children}</Context.Provider>;
}

type PartProps<T extends "button" | "div" | "h2" | "p"> = ComponentProps<T> & {
	/** Render your own element instead of the default one. */
	render?: RenderProp;
};

export function SheetTrigger({ render, ...props }: PartProps<"button">) {
	const { api } = useSheet();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "sheet-trigger" },
			props,
		),
		render,
	);
}

export function SheetClose({ render, ...props }: PartProps<"button">) {
	const { api } = useSheet();
	// Several close parts must not share Zag's one close trigger id.
	const { id: _id, ...closeProps } = api.getCloseTriggerProps();
	return renderPart(
		"button",
		mergeProps({ ...closeProps, "data-slot": "sheet-close" }, props),
		render,
	);
}

const placement: Record<SheetSide, { positioner: string; panel: string }> = {
	right: {
		positioner: "justify-end",
		panel:
			"h-full w-3/4 max-w-sm rounded-l-3xl data-ending-style:translate-x-full data-starting-style:translate-x-full",
	},
	left: {
		positioner: "justify-start",
		panel:
			"h-full w-3/4 max-w-sm rounded-r-3xl data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
	},
	top: {
		positioner: "items-start",
		panel:
			"max-h-full w-full rounded-b-3xl data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
	},
	bottom: {
		positioner: "items-end",
		panel:
			"max-h-full w-full rounded-t-3xl data-ending-style:translate-y-full data-starting-style:translate-y-full",
	},
};

/** Backdrop, panel and focus trap. Mounts only while open or leaving. */
export function SheetContent({
	className,
	render,
	...props
}: PartProps<"div">) {
	const { api, side } = useSheet();
	// Grows out of its trigger when it has one; opened from code it slides from its edge.
	const drop = useWaterDrop({
		sourceId: api.getTriggerProps().id,
		material: "liquid-glass squircle [--squircle-radius:1.75rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	const positioner = useRef<HTMLDivElement>(null);
	useVisualViewportVars(positioner, mounted);
	if (!mounted) return null;
	const state = { ...attrs, "data-open": api.open ? "" : undefined };
	return (
		<Portal>
			<div
				{...api.getBackdropProps()}
				{...state}
				hidden={false}
				data-slot="sheet-overlay"
				className="ease-standard fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-(--duration-normal) data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:opacity-[calc(1-var(--drawer-swipe-progress))] data-swiping:transition-none motion-reduce:transition-none"
			/>
			<div
				{...api.getPositionerProps()}
				ref={positioner}
				hidden={false}
				className={cx(
					"fixed inset-x-0 top-(--visual-viewport-top,0px) z-50 flex h-(--visual-viewport-height,100dvh)",
					placement[side].positioner,
				)}
			>
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...state,
							ref,
							hidden: false,
							"data-slot": "sheet-content",
							"data-side": side,
							className: cx(
								"relative flex flex-col overflow-y-auto overscroll-contain liquid-glass morph-reset p-6 text-label outline-none transition-[transform,translate] duration-(--duration-sheet) ease-(--ease-sheet) motion-reduce:transition-none motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-starting-style:translate-x-0 motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-ending-style:opacity-0 motion-reduce:data-starting-style:opacity-0",
								placement[side].panel,
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

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cx("flex flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cx("mt-auto flex flex-col gap-2 pt-4", className)}
			{...props}
		/>
	);
}

export function SheetTitle({ className, ...props }: ComponentProps<"h2">) {
	const { api } = useSheet();
	return (
		<h2
			{...api.getTitleProps()}
			data-slot="sheet-title"
			className={cx("text-headline font-semibold text-label", className)}
			{...props}
		/>
	);
}

export function SheetDescription({ className, ...props }: ComponentProps<"p">) {
	const { api } = useSheet();
	return (
		<p
			{...api.getDescriptionProps()}
			data-slot="sheet-description"
			className={cx("text-subheadline text-label-secondary", className)}
			{...props}
		/>
	);
}
