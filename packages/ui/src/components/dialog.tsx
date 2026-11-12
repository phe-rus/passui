"use client";

import * as dialog from "@zag-js/dialog";
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

const Context = createContext<dialog.Api | null>(null);

function useDialog() {
	const api = useContext(Context);
	if (!api) throw new Error("Dialog parts must be used inside <Dialog>.");
	return api;
}

export interface DialogProps extends Omit<dialog.Props, "id" | "ids" | "role"> {
	children?: ReactNode;
}

/** Owns the open state. Renders no element, so parts can sit anywhere inside it. */
export function Dialog({ children, ...props }: DialogProps) {
	const id = useId();
	const service = useMachine(dialog.machine, { id, ...props });
	const api = dialog.connect(service, normalizeProps);
	return <Context.Provider value={api}>{children}</Context.Provider>;
}

type PartProps<T extends "button" | "div" | "h2" | "p"> = ComponentProps<T> & {
	/** Render your own element instead of the default one. */
	render?: RenderProp;
};

export function DialogTrigger({ render, ...props }: PartProps<"button">) {
	const api = useDialog();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "dialog-trigger" },
			props,
		),
		render,
	);
}

export function DialogClose({ render, ...props }: PartProps<"button">) {
	const api = useDialog();
	// Zag gives its one close trigger an id; several close parts must not share it.
	const { id: _id, ...closeProps } = api.getCloseTriggerProps();
	return renderPart(
		"button",
		mergeProps({ ...closeProps, "data-slot": "dialog-close" }, props),
		render,
	);
}

/** The backdrop, centred panel and focus trap. Mounts only while open or leaving. */
export function DialogContent({
	className,
	render,
	...props
}: PartProps<"div">) {
	const api = useDialog();
	// Grows out of its trigger when it has one; opened from code it pops at the centre.
	const drop = useWaterDrop({
		sourceId: api.getTriggerProps().id,
		material: "liquid-glass squircle [--squircle-radius:1.75rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	const positioner = useRef<HTMLDivElement>(null);
	// Keeps the panel above the soft keyboard (spec 0003 AC-8).
	useVisualViewportVars(positioner, mounted);
	if (!mounted) return null;
	const state = { ...attrs, "data-open": api.open ? "" : undefined };
	return (
		<Portal>
			<div
				{...api.getBackdropProps()}
				{...state}
				hidden={false}
				data-slot="dialog-overlay"
				className="ease-standard fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-(--duration-normal) data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
			/>
			<div
				{...api.getPositionerProps()}
				ref={positioner}
				className="fixed inset-x-0 top-(--visual-viewport-top,0px) z-50 flex h-(--visual-viewport-height,100dvh) items-center justify-center p-4"
			>
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...state,
							ref,
							hidden: false,
							"data-slot": "dialog-content",
							className: cx(
								"relative grid max-h-full w-full max-w-lg gap-4 overflow-y-auto liquid-glass squircle morph-reset [--squircle-radius:1.75rem] p-6 text-label outline-none transition spring-smooth data-ending-style:scale-[0.88] data-starting-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
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

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cx("flex flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cx(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

export function DialogTitle({ className, ...props }: ComponentProps<"h2">) {
	const api = useDialog();
	return (
		<h2
			{...api.getTitleProps()}
			data-slot="dialog-title"
			className={cx("text-headline font-semibold text-label", className)}
			{...props}
		/>
	);
}

export function DialogDescription({
	className,
	...props
}: ComponentProps<"p">) {
	const api = useDialog();
	return (
		<p
			{...api.getDescriptionProps()}
			data-slot="dialog-description"
			className={cx("text-subheadline text-label-secondary", className)}
			{...props}
		/>
	);
}
