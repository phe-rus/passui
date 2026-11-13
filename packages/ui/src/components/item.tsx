import { type ComponentProps, type ReactNode, useId, useState } from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";

/** Row height and text scale for a whole group: `sm` is dense, `lg` is roomy. */
export type ItemSize = "sm" | "md" | "lg";

export interface ItemGroupProps
	extends Omit<ComponentProps<"section">, "title"> {
	/** Optional group heading, which also names the list for assistive technology. */
	title?: ReactNode;
	/** Supporting text below the grouped rows. */
	footer?: ReactNode;
	/** Row height, title and footer scale. @default "md" */
	size?: ItemSize;
}

/**
 * A titled, inset group of rows with a footer note, as in iOS Settings. Rows
 * share one rounded plate with hairlines between them.
 */
export function ItemGroup({
	title,
	footer,
	size = "md",
	className,
	children,
	...props
}: ItemGroupProps) {
	const id = useId();
	return (
		<section
			data-slot="item-group"
			data-size={size}
			className={cx("group/item-group flex flex-col gap-1.5", className)}
			{...props}
		>
			{title ? (
				<h3
					id={`${id}-title`}
					className="text-footnote text-label-secondary group-data-[size=lg]/item-group:text-subheadline group-data-[size=sm]/item-group:text-caption m-0 px-4 font-normal"
				>
					{title}
				</h3>
			) : null}
			<div
				role="list"
				aria-labelledby={title ? `${id}-title` : undefined}
				className="inset-group squircle divide-separator/60 border-separator/60 divide-y border [--squircle-radius:1.25rem]"
			>
				{children}
			</div>
			{footer ? (
				<p className="text-footnote text-label-secondary group-data-[size=lg]/item-group:text-subheadline group-data-[size=sm]/item-group:text-caption m-0 px-4">
					{footer}
				</p>
			) : null}
		</section>
	);
}

export interface ItemProps extends Omit<ComponentProps<"div">, "children"> {
	children?: ReactNode;
	/** Shows the disclosure chevron, for rows that open something. */
	chevron?: boolean;
	/** Makes the whole row your own element, such as a router link or a button. */
	render?: RenderProp;
	/** Content revealed under the row, such as a form. The row becomes its toggle. */
	panel?: ReactNode;
	/** Whether the panel is open, when you control it. */
	open?: boolean;
	/** Whether the panel starts open. @default false */
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const chevronClass =
	"text-label-tertiary size-4 shrink-0 transition-transform duration-(--duration-fast) motion-reduce:transition-none";

function Chevron({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			aria-hidden="true"
			className={cx(chevronClass, className)}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m6 3 5 5-5 5" />
		</svg>
	);
}

const rowClass =
	"relative flex w-full items-center gap-3 px-4 text-left text-label outline-none min-h-11 py-2 group-data-[size=sm]/item-group:min-h-9 group-data-[size=sm]/item-group:py-1.5 group-data-[size=lg]/item-group:min-h-14 group-data-[size=lg]/item-group:py-3";

const pressClass =
	"hover:bg-fill/70 active:bg-fill focus-visible:ring-accent/70 transition-colors duration-(--duration-instant) focus-visible:ring-2 focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-reduce:transition-none";

/**
 * One row. Compose it from `ItemMedia`, `ItemContent` and `ItemActions`. With
 * `render` the whole row presses like iOS; with `panel` it opens to reveal
 * content, such as inputs, under the row.
 */
export function Item({
	chevron,
	render,
	panel,
	open,
	defaultOpen = false,
	onOpenChange,
	className,
	children,
	...props
}: ItemProps) {
	const id = useId();
	const [inner, setInner] = useState(defaultOpen);
	const expanded = open ?? inner;
	const toggle = () => {
		setInner(!expanded);
		onOpenChange?.(!expanded);
	};
	const state = expanded ? "open" : "closed";
	return (
		<div
			data-slot="item"
			role="listitem"
			className={cx("group/item relative", className)}
			{...props}
		>
			{panel !== undefined ? (
				<>
					<button
						type="button"
						id={`${id}-trigger`}
						aria-expanded={expanded}
						aria-controls={`${id}-panel`}
						data-state={state}
						onClick={toggle}
						className={cx(rowClass, pressClass)}
					>
						{children}
						<Chevron
							className={cx(
								"group-hover/item:translate-x-0.5",
								expanded && "rotate-90 group-hover/item:translate-x-0",
							)}
						/>
					</button>
					<div
						id={`${id}-panel`}
						role="region"
						aria-labelledby={`${id}-trigger`}
						data-state={state}
						inert={!expanded}
						className={cx(
							"spring-smooth grid transition-[grid-template-rows] motion-reduce:transition-none",
							expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
						)}
					>
						<div className="min-h-0 overflow-hidden">
							<div
								className={cx(
									"flex flex-col gap-3 px-4 pt-2 pb-4 transition-opacity duration-(--duration-fast) motion-reduce:transition-none",
									!expanded && "opacity-0",
								)}
							>
								{panel}
							</div>
						</div>
					</div>
				</>
			) : render ? (
				renderPart(
					"a",
					mergeProps(
						{
							className: cx(rowClass, pressClass),
							children: (
								<>
									{children}
									{chevron ? (
										<Chevron className="group-hover/item:translate-x-0.5" />
									) : null}
								</>
							),
						},
						{},
					),
					render,
				)
			) : (
				<div className={rowClass}>
					{children}
					{chevron ? <Chevron /> : null}
				</div>
			)}
		</div>
	);
}

export interface ItemMediaProps extends ComponentProps<"span"> {
	/** `icon` is a small accent glyph; `image` is a rounded thumbnail. @default "icon" */
	variant?: "icon" | "image";
}

/** The icon or image at the start of a row. The hairline insets past it. */
export function ItemMedia({
	variant = "icon",
	className,
	...props
}: ItemMediaProps) {
	return (
		<span
			data-slot="item-media"
			data-variant={variant}
			className={cx(
				"flex shrink-0 items-center justify-center",
				variant === "icon"
					? "text-accent-text size-8 [&_svg]:size-5"
					: "size-10 overflow-hidden rounded-xl [&_img]:size-full [&_img]:object-cover",
				className,
			)}
			{...props}
		/>
	);
}

/** Holds the title and description, taking the room the media and actions leave. */
export function ItemContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="item-content"
			className={cx("flex min-w-0 flex-1 flex-col", className)}
			{...props}
		/>
	);
}

export function ItemTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="item-title"
			className={cx(
				"text-body truncate group-data-[size=sm]/item-group:text-subheadline",
				className,
			)}
			{...props}
		/>
	);
}

export function ItemDescription({
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			data-slot="item-description"
			className={cx(
				"text-footnote text-label-secondary line-clamp-2 group-data-[size=sm]/item-group:text-caption",
				className,
			)}
			{...props}
		/>
	);
}

/** A value, switch, badge or button at the end of a row. */
export function ItemActions({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="item-actions"
			className={cx(
				"text-body text-label-secondary flex shrink-0 items-center gap-2 group-data-[size=sm]/item-group:text-subheadline",
				className,
			)}
			{...props}
		/>
	);
}
