import type { ComponentProps, ReactNode } from "react";
import { cx } from "../lib/cx";

export type TraceStatus = "pending" | "running" | "done" | "error";

const dot: Record<TraceStatus, string> = {
	pending: "border-separator bg-transparent",
	running:
		"border-accent bg-accent/30 animate-pulse motion-reduce:animate-none",
	done: "border-success bg-success",
	error: "border-danger bg-danger",
};

/** A timeline of steps: reasoning, tool calls, sources. Each step can fold open its detail. */
export function Trace({ className, ...props }: ComponentProps<"ol">) {
	return (
		<ol
			data-slot="trace"
			className={cx("m-0 flex list-none flex-col p-0", className)}
			{...props}
		/>
	);
}

export type TraceItemProps = Omit<ComponentProps<"li">, "title"> & {
	title: ReactNode;
	/** The state of this step. @default "done" */
	status?: TraceStatus;
	/** A short note beside the title, such as a duration. */
	meta?: ReactNode;
	/** Opens the detail by default. @default false */
	defaultOpen?: boolean;
};

export function TraceItem({
	title,
	status = "done",
	meta,
	defaultOpen = false,
	className,
	children,
	...props
}: TraceItemProps) {
	const head = (
		<>
			<span className="text-footnote text-label min-w-0 flex-1 truncate font-medium">
				{title}
			</span>
			{meta ? (
				<span className="text-caption text-label-tertiary shrink-0">
					{meta}
				</span>
			) : null}
		</>
	);
	return (
		<li
			data-slot="trace-item"
			data-status={status}
			className={cx(
				"relative pb-4 ps-6 last:pb-0 before:absolute before:start-[5px] before:top-4 before:-bottom-0 before:w-px before:bg-separator/60 last:before:hidden",
				className,
			)}
			{...props}
		>
			<span
				aria-hidden="true"
				className={cx(
					"absolute start-0 top-1.5 size-[11px] rounded-full border-2",
					dot[status],
				)}
			/>
			{children ? (
				<details open={defaultOpen} className="group">
					<summary className="focus-visible:ring-accent/70 flex cursor-pointer list-none items-center gap-2 rounded-md outline-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
						{head}
						<span
							aria-hidden="true"
							className="text-label-tertiary text-caption transition-transform group-open:rotate-90 motion-reduce:transition-none"
						>
							›
						</span>
					</summary>
					<div className="text-footnote text-label-secondary mt-1.5">
						{children}
					</div>
				</details>
			) : (
				<div className="flex items-center gap-2">{head}</div>
			)}
		</li>
	);
}
