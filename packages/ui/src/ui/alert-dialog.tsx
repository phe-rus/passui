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
		mergeProps({ ...closeProps, "data-slot": "alert-dialog-action" }, props),
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
	const { ref, mounted, attrs } = usePresence(api.open);
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
								"relative grid w-full max-w-md gap-4 rounded-3xl bg-elevated p-6 text-label shadow-floating outline-none ring-1 ring-separator transition duration-(--duration-normal) ease-standard data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
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
			className={cx("flex flex-col gap-1.5", className)}
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
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
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
