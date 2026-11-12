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
import { tallestSnapPoint } from "../lib/drawer.math";
import { usePageScale } from "../lib/page-scale";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";
import { useSwipeTouchAction } from "../lib/swipe-touch-action";
import { useVisualViewportVars } from "../lib/visual-viewport";

const Context = createContext<drawer.Api | null>(null);

function useDrawer() {
	const api = useContext(Context);
	if (!api) throw new Error("Drawer parts must be used inside <Drawer>.");
	return api;
}

export interface DrawerProps
	extends Omit<
		drawer.Props,
		| "id"
		| "ids"
		| "role"
		| "stack"
		| "swipeDirection"
		| "snapPoint"
		| "defaultSnapPoint"
	> {
	/** Snap point to rest at first. Uncontrolled. */
	defaultSnapPoint?: drawer.SnapPoint;
	/** Controlled snap point. Pair with `onSnapPointChange`. */
	activeSnapPoint?: drawer.SnapPoint | null;
	children?: ReactNode;
}

/** A bottom sheet you drag down to dismiss. Renders no element of its own. */
export function Drawer({ children, activeSnapPoint, ...props }: DrawerProps) {
	const id = useId();
	const service = useMachine(drawer.machine, {
		id,
		swipeDirection: "down",
		snapPoint: activeSnapPoint,
		...props,
	});
	const api = drawer.connect(service, normalizeProps);
	return <Context.Provider value={api}>{children}</Context.Provider>;
}

type PartProps<T extends "button" | "div" | "h2" | "p"> = ComponentProps<T> & {
	/** Render your own element instead of the default one. */
	render?: RenderProp;
};

export function DrawerTrigger({ render, ...props }: PartProps<"button">) {
	const api = useDrawer();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "drawer-trigger" },
			props,
		),
		render,
	);
}

export function DrawerClose({ render, ...props }: PartProps<"button">) {
	const api = useDrawer();
	// Several close parts must not share Zag's one close trigger id.
	const { id: _id, ...closeProps } = api.getCloseTriggerProps();
	return renderPart(
		"button",
		mergeProps({ ...closeProps, "data-slot": "drawer-close" }, props),
		render,
	);
}

/**
 * Backdrop, panel and focus trap. Mounts while open or leaving. As tall as its
 * content, or as tall as the biggest numeric `snapPoints` entry.
 */
export function DrawerContent({
	className,
	render,
	style,
	...props
}: PartProps<"div">) {
	const api = useDrawer();
	const id = useId();
	const { ref, mounted, attrs } = usePresence(api.open);
	const positioner = useRef<HTMLDivElement>(null);
	useVisualViewportVars(positioner, mounted);
	// The body drags on touch too, not only the handle.
	useSwipeTouchAction(ref, mounted, "y");
	// Until Zag has measured the panel its open percentage reads 0, so treat that as fully open.
	const openness = !api.open
		? 0
		: api.getContentSize()
			? api.getOpenPercentage()
			: 1;
	usePageScale(id, mounted, openness, api.dragging);
	if (!mounted) return null;
	const state = { ...attrs, "data-open": api.open ? "" : undefined };
	const tallest = tallestSnapPoint(api.snapPoints);
	return (
		<Portal>
			<div
				{...api.getBackdropProps()}
				{...state}
				hidden={false}
				data-slot="drawer-overlay"
				className="ease-standard fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-(--duration-normal) data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:opacity-[calc(1-var(--drawer-swipe-progress))] data-swiping:transition-none motion-reduce:transition-none"
			/>
			<div
				{...api.getPositionerProps()}
				ref={positioner}
				hidden={false}
				className="fixed inset-x-0 top-(--visual-viewport-top,0px) z-[60] flex h-(--visual-viewport-height,100dvh) items-end justify-center"
			>
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...state,
							ref,
							hidden: false,
							"data-slot": "drawer-content",
							style: {
								...(tallest ? { height: `${tallest * 100}%` } : null),
								...style,
							},
							className: cx(
								"relative flex max-h-[calc(100%-1.625rem)] w-full max-w-xl flex-col overflow-y-auto overscroll-contain rounded-t-3xl glass-menu squircle pb-[env(safe-area-inset-bottom)] text-label outline-none transition-[transform,translate,scale] duration-(--duration-sheet) ease-(--ease-sheet) data-ending-style:translate-y-full data-starting-style:translate-y-full data-nested-drawer-open:origin-bottom data-nested-drawer-open:scale-[calc(1-0.04*var(--nested-drawers,0))] motion-reduce:transition-none motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-ending-style:opacity-0 motion-reduce:data-starting-style:opacity-0",
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

/** The grab handle. Dragging it moves the drawer even when the content scrolls. */
export function DrawerHandle({ className, ...props }: ComponentProps<"div">) {
	const api = useDrawer();
	return (
		<div
			{...api.getGrabberProps()}
			data-slot="drawer-handle"
			className={cx(
				"flex h-6 w-full shrink-0 cursor-grab items-center justify-center",
				className,
			)}
			{...props}
		>
			<div
				{...api.getGrabberIndicatorProps()}
				className="bg-label-secondary/40 h-1.5 w-10 rounded-full"
			/>
		</div>
	);
}

export function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cx("flex flex-col gap-1.5 px-6 pt-2 text-center", className)}
			{...props}
		/>
	);
}

export function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cx("mt-auto flex flex-col gap-2 p-6", className)}
			{...props}
		/>
	);
}

export function DrawerTitle({ className, ...props }: ComponentProps<"h2">) {
	const api = useDrawer();
	return (
		<h2
			{...api.getTitleProps()}
			data-slot="drawer-title"
			className={cx("text-headline font-semibold text-label", className)}
			{...props}
		/>
	);
}

export function DrawerDescription({
	className,
	...props
}: ComponentProps<"p">) {
	const api = useDrawer();
	return (
		<p
			{...api.getDescriptionProps()}
			data-slot="drawer-description"
			className={cx("text-footnote text-label-secondary", className)}
			{...props}
		/>
	);
}
