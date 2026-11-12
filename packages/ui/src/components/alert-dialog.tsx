"use client";

import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	type RefObject,
	useContext,
	useId,
	useRef,
} from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";
import { useWaterDrop } from "../lib/water-drop";

interface Value {
	api: dialog.Api;
	cancel: RefObject<HTMLElement | null>;
}

const Context = createContext<Value | null>(null);

function useAlertDialog() {
	const value = useContext(Context);
	if (!value)
		throw new Error("AlertDialog parts must be used inside <AlertDialog>.");
	return value;
}

export interface AlertDialogProps
	extends Omit<
		dialog.Props,
		| "id"
		| "ids"
		| "role"
		| "modal"
		| "closeOnInteractOutside"
		| "initialFocusEl"
	> {
	children?: ReactNode;
}

/**
 * A dialog that waits for an answer. An outside press does nothing, Escape
 * presses Cancel, and Cancel receives focus first.
 */
export function AlertDialog({ children, ...props }: AlertDialogProps) {
	const id = useId();
	const cancel = useRef<HTMLElement | null>(null);
	const apiRef = useRef<dialog.Api | null>(null);
	const service = useMachine(dialog.machine, {
		id,
		...props,
		role: "alertdialog",
		modal: true,
		closeOnInteractOutside: false,
		initialFocusEl: () => cancel.current,
		onEscapeKeyDown(event) {
			event.preventDefault();
			props.onEscapeKeyDown?.(event);
			if (cancel.current) cancel.current.click();
			else apiRef.current?.setOpen(false);
		},
	});
	const api = dialog.connect(service, normalizeProps);
	apiRef.current = api;
	return (
		<Context.Provider value={{ api, cancel }}>{children}</Context.Provider>
	);
}

/** Full bleed hairline action cells, as in iOS alerts. */
const actionStyles =
	"h-11 px-3 text-body outline-none transition spring-snappy hover:bg-fill/50 active:bg-fill/80 focus-visible:bg-fill/60";

type PartProps<T extends "button" | "div" | "h2" | "p"> = ComponentProps<T> & {
	/** Render your own element instead of the default one. */
	render?: RenderProp;
};

export function AlertDialogTrigger({ render, ...props }: PartProps<"button">) {
	const { api } = useAlertDialog();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "alert-dialog-trigger" },
			props,
		),
		render,
	);
}

/** Confirms the question and closes. Style it with `className` or `render`. */
export function AlertDialogAction({ render, ...props }: PartProps<"button">) {
	const { api } = useAlertDialog();
	// Cancel owns Zag's close trigger id; the action must not repeat it.
	const { id: _id, ...closeProps } = api.getCloseTriggerProps();
	return renderPart(
		"button",
		mergeProps(
			{
				...closeProps,
				"data-slot": "alert-dialog-action",
				className: actionStyles + " font-semibold text-accent-text",
			},
			props,
		),
		render,
	);
}

/** Dismisses the question and closes. It receives focus when the dialog opens. */
export function AlertDialogCancel({ render, ...props }: PartProps<"button">) {
	const { api, cancel } = useAlertDialog();
	return renderPart(
		"button",
		mergeProps(
			{
				...api.getCloseTriggerProps(),
				ref: cancel,
				"data-slot": "alert-dialog-cancel",
				className: actionStyles,
			},
			props,
		),
		render,
	);
}

export function AlertDialogContent({
	className,
	render,
	...props
}: PartProps<"div">) {
	const { api } = useAlertDialog();
	const drop = useWaterDrop({
		sourceId: api.getTriggerProps().id,
		material: "liquid-glass squircle [--squircle-radius:1.5rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	if (!mounted) return null;
	const state = { ...attrs, "data-open": api.open ? "" : undefined };
	return (
		<Portal>
			<div
				{...api.getBackdropProps()}
				{...state}
				hidden={false}
				data-slot="alert-dialog-overlay"
				className="ease-standard fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-(--duration-normal) data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
			/>
			<div
				{...api.getPositionerProps()}
				className="fixed inset-0 z-50 flex items-center justify-center p-4"
			>
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...state,
							ref,
							hidden: false,
							"data-slot": "alert-dialog-content",
							className: cx(
								"relative grid w-[17.5rem] max-w-[calc(100vw-3rem)] gap-0 overflow-hidden liquid-glass squircle morph-reset [--squircle-radius:1.5rem] text-center text-label outline-none transition spring-smooth data-ending-style:scale-[0.88] data-starting-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
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

export function AlertDialogHeader({
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cx(
				"flex flex-col items-center gap-1 px-4 pt-5 pb-4",
				className,
			)}
			{...props}
		/>
	);
}

export function AlertDialogFooter({
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cx(
				"flex divide-x divide-separator border-t border-separator [&>*]:min-w-0 [&>*]:flex-1",
				className,
			)}
			{...props}
		/>
	);
}

export function AlertDialogTitle({
	className,
	...props
}: ComponentProps<"h2">) {
	const { api } = useAlertDialog();
	return (
		<h2
			{...api.getTitleProps()}
			data-slot="alert-dialog-title"
			className={cx("text-headline font-semibold text-label", className)}
			{...props}
		/>
	);
}

export function AlertDialogDescription({
	className,
	...props
}: ComponentProps<"p">) {
	const { api } = useAlertDialog();
	return (
		<p
			{...api.getDescriptionProps()}
			data-slot="alert-dialog-description"
			className={cx("text-subheadline text-label-secondary", className)}
			{...props}
		/>
	);
}
