"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagToast from "@zag-js/toast";
import { useId } from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";

/**
 * The app wide toast store. Call `toast.success({ title })`, `toast.error(...)`
 * or `toast.promise(...)` from anywhere, and render one `<Toaster />`.
 */
export const toast = zagToast.createStore({
	placement: "bottom-end",
	overlap: true,
	gap: 12,
});

const tones: Record<string, string> = {
	success: "before:bg-success",
	error: "before:bg-danger",
	warning: "before:bg-warning",
	loading: "before:bg-accent",
	info: "before:bg-accent",
};

function ToastItem({
	toast: props,
	parent,
	index,
}: {
	toast: zagToast.Props;
	parent: zagToast.GroupService;
	index: number;
}) {
	const service = useMachine(zagToast.machine, { ...props, parent, index });
	const api = zagToast.connect(service, normalizeProps);
	return (
		<div
			{...api.getRootProps()}
			data-slot="toast"
			className={cx(
				"relative flex w-80 items-start gap-3 overflow-hidden rounded-2xl bg-elevated py-3 pl-5 pr-3 text-label shadow-floating ring-1 ring-separator before:absolute before:inset-y-3 before:left-2 before:w-1 before:rounded-full",
				tones[api.type] ?? "before:bg-label-tertiary",
			)}
		>
			<div className="min-w-0 flex-1">
				<div
					{...api.getTitleProps()}
					className="text-subheadline font-semibold"
				>
					{api.title as never}
				</div>
				{api.description ? (
					<div
						{...api.getDescriptionProps()}
						className="text-footnote text-label-secondary mt-0.5"
					>
						{api.description as never}
					</div>
				) : null}
			</div>
			<button
				{...api.getCloseTriggerProps()}
				aria-label="Dismiss"
				className="text-label-secondary hover:bg-fill focus-visible:ring-accent/70 flex size-7 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2"
			>
				<svg
					viewBox="0 0 16 16"
					className="size-3.5"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<path d="m4 4 8 8M12 4l-8 8" />
				</svg>
			</button>
		</div>
	);
}

/** Renders the toasts. Mount it once, near the root. */
export function Toaster() {
	const id = useId();
	const service = useMachine(zagToast.group.machine, { id, store: toast });
	const api = zagToast.group.connect(service, normalizeProps);
	return (
		<Portal>
			<div {...api.getGroupProps()} data-slot="toaster">
				{api.getToasts().map((item, index) => (
					<ToastItem
						key={item.id}
						toast={item}
						parent={service}
						index={index}
					/>
				))}
			</div>
		</Portal>
	);
}
