"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as zagToast from "@zag-js/toast";
import { useId, useRef, useState } from "react";
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

const dots: Record<string, string> = {
	success: "bg-success",
	error: "bg-danger",
	warning: "bg-warning",
	loading: "bg-accent animate-pulse",
	info: "bg-accent",
};

const DISMISS_DISTANCE = 72;

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
	const drag = useRef<{ x: number; id: number } | null>(null);
	const [dx, setDx] = useState(0);
	const expanded = Boolean(api.description) || Boolean(props.action);
	const root = api.getRootProps();
	return (
		<div
			{...root}
			data-slot="toast"
			data-expanded={expanded ? "" : undefined}
			style={{
				...root.style,
				translate: `calc(var(--x, 0px) + ${dx}px) var(--y)`,
				scale: "var(--scale, 1)",
				opacity: dx === 0 ? undefined : 1 - Math.min(Math.abs(dx) / 160, 0.7),
				transitionDuration: dx === 0 ? undefined : "0ms",
			}}
			onPointerDown={(event) => {
				drag.current = { x: event.clientX, id: event.pointerId };
				event.currentTarget.setPointerCapture(event.pointerId);
			}}
			onPointerMove={(event) => {
				if (drag.current) setDx(event.clientX - drag.current.x);
			}}
			onPointerUp={() => {
				if (Math.abs(dx) > DISMISS_DISTANCE) api.dismiss();
				drag.current = null;
				setDx(0);
			}}
			onPointerCancel={() => {
				drag.current = null;
				setDx(0);
			}}
			className="liquid-glass group text-label spring-bouncy data-[state=closed]:spring-smooth w-fit max-w-[min(26rem,calc(100vw-2rem))] touch-pan-y overflow-hidden rounded-[1.75rem] opacity-(--opacity) transition-[translate,scale,opacity,border-radius] select-none [--squircle-radius:1.75rem] motion-reduce:transition-none"
		>
			<div className="flex items-center gap-3 py-2.5 pr-2.5 pl-4">
				<span
					aria-hidden="true"
					className={cx(
						"size-2.5 shrink-0 rounded-full shadow-[0_0_10px_currentColor]",
						dots[api.type] ?? "bg-label-tertiary",
					)}
				/>
				<div className="min-w-0 flex-1">
					<div
						{...api.getTitleProps()}
						className="text-subheadline truncate font-semibold"
					>
						{api.title as never}
					</div>
				</div>
				{props.action ? (
					<button
						{...api.getActionTriggerProps()}
						className="bg-fill text-footnote text-accent-text spring-snappy focus-visible:ring-accent/70 rounded-full px-3 py-1 font-semibold transition outline-none focus-visible:ring-2 active:scale-95"
					>
						{props.action.label}
					</button>
				) : null}
				<button
					{...api.getCloseTriggerProps()}
					aria-label="Dismiss"
					className="text-label-secondary spring-snappy hover:bg-fill focus-visible:ring-accent/70 flex size-7 shrink-0 items-center justify-center rounded-full transition outline-none focus-visible:ring-2 active:scale-90"
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
			{api.description ? (
				<div className="grid grid-rows-[1fr]">
					<div
						{...api.getDescriptionProps()}
						className="text-footnote text-label-secondary overflow-hidden px-4 pb-3 pl-[2.375rem]"
					>
						{api.description as never}
					</div>
				</div>
			) : null}
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
