import { CheckIcon } from "@passui/icons/check";
import { ChevronRightIcon } from "@passui/icons/chevron-right";
import { CopyIcon } from "@passui/icons/copy";
import { Button, type ButtonSize } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";

type SettingListProps = {
	id?: string;
	/** h3 when the list sits inside an Area that already has the h2. */
	as?: "h2" | "h3";
	/** A Glyph beside the heading; rows themselves stay plain. */
	icon?: ReactNode;
	title?: string;
	description?: string;
	/** Right of the heading: an Add button, or a Coming soon badge. */
	action?: ReactNode;
	/** "tile": the rounded, lifted card of the account app's overview. */
	variant?: "inset" | "tile";
	children: ReactNode;
	className?: string;
};

type RowProps = {
	icon?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	/** The current value, muted on the right, like "On" or an email. */
	value?: ReactNode;
	trailing?: ReactNode;
	to?: LinkProps["to"];
	params?: LinkProps["params"];
	hash?: string;
	onClick?: () => void;
	/** Show the chevron without a destination, for a preview row. */
	chevron?: boolean;
	tone?: "default" | "destructive";
};

/**
 * A titled group of settings in one inset card, hairlines between rows
 * (even rows wrapped in a Preview), a soft highlight under the one you point at.
 */
export function SettingList({
	id,
	as: Heading = "h2",
	icon,
	title,
	description,
	action,
	variant = "inset",
	children,
	className,
}: SettingListProps) {
	const lines = cn(
		"[&>*+*]:border-separator/40 [&>*+*]:border-t",
		"[&_.setting-row+.setting-row]:border-separator/40 [&_.setting-row+.setting-row]:border-t",
	);

	// the account app's tile: the heading lives inside the card, on a tinted band
	if (variant === "tile")
		return (
			<section
				id={id}
				className={cn(
					"border-separator/70 bg-elevated flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border shadow-sm",
					className,
				)}
			>
				{title && (
					<div className="border-separator/60 flex items-center gap-3 border-b px-4 py-4 sm:px-5 [&>span:first-child]:size-9 [&>span:first-child_.glyph]:size-4">
						{icon}
						<div className="flex min-w-0 flex-1 flex-col">
							<Heading className="text-callout">{title}</Heading>
							{description && (
								<p className="text-footnote text-label-secondary">
									{description}
								</p>
							)}
						</div>
						{action}
					</div>
				)}
				<div
					className={cn(
						"[&_.setting-row_h3]:text-subheadline [&_.setting-row_p]:text-footnote flex flex-col py-1 [&_.setting-row]:min-h-16 [&_.setting-row]:px-4 sm:[&_.setting-row]:px-5",
						lines,
					)}
				>
					{children}
				</div>
			</section>
		);

	return (
		<section
			id={id}
			className={cn(
				"flex scroll-mt-20 flex-col gap-3",
				"[&>div:last-child]:rounded-2xl [&>div:last-child]:shadow-xs",
				"[&>div:first-child_h2]:text-subheadline [&>div:first-child_h2]:font-semibold",
				"[&>div:first-child_p]:text-footnote [&>div:first-child_p]:text-label-secondary",
				"[&_.setting-row]:min-h-16 [&_.setting-row]:px-4 [&_.setting-row]:py-3",
				"[&_.setting-row_h3]:text-subheadline [&_.setting-row_h3]:wrap-anywhere [&_.setting-row_h3]:whitespace-normal",
				"[&_.setting-row_p]:text-footnote [&_.setting-row_p]:text-label-secondary [&_.setting-row_p]:wrap-anywhere",
				"[&_.setting-row>span]:wrap-anywhere [&_.setting-row>span]:whitespace-normal",
				className,
			)}
		>
			{title && (
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div className="flex min-w-0 flex-1 items-start gap-3">
						{icon}
						<div className="min-w-0 wrap-anywhere">
							<Heading>{title}</Heading>
							{description && <p className="text-subheadline">{description}</p>}
						</div>
					</div>
					{action}
				</div>
			)}
			<div
				className={cn(
					"border-separator/35 bg-elevated flex flex-col overflow-hidden rounded-xl border shadow-xs",
					lines,
				)}
			>
				{children}
			</div>
		</section>
	);
}

function Row({
	icon,
	title,
	description,
	value,
	trailing,
	to,
	params,
	hash,
	onClick,
	chevron,
	tone = "default",
}: RowProps) {
	const interactive = Boolean(to || onClick);
	const className = cn(
		"setting-row flex min-h-10 w-full items-center gap-3 px-3.5 py-1.5 text-left",
		interactive &&
			"hover:bg-label/[0.035] focus-visible:bg-label/[0.05] cursor-pointer transition-colors focus-visible:outline-none",
		tone === "destructive" && "[&_h3]:text-danger",
	);
	const body = (
		<>
			{icon}
			<span className="flex min-w-0 flex-1 flex-col">
				<h3 className="text-subheadline truncate">{title}</h3>
				{description && <p className="text-caption">{description}</p>}
			</span>
			{value && (
				<span className="text-subheadline text-label-secondary max-w-[45%] truncate">
					{value}
				</span>
			)}
			{trailing}
			{(chevron ?? interactive) && (
				<ChevronRightIcon size={16} className="text-label-tertiary shrink-0" />
			)}
		</>
	);

	if (to) {
		return (
			<Link to={to} params={params} hash={hash} className={className}>
				{body}
			</Link>
		);
	}
	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={className}>
				{body}
			</button>
		);
	}
	return <div className={className}>{body}</div>;
}

/** A row's trailing copy button; shows a tick for a moment after copying. */
function Copy({
	value,
	label = "Copy",
	size = "icon-xs",
}: {
	value: string;
	label?: string;
	/** Quiet and row-sized by default; any of Passui's icon sizes. */
	size?: ButtonSize;
}) {
	const [copied, setCopied] = useState(false);
	return (
		<Button
			variant="ghost"
			size={size}
			aria-label={label}
			onClick={async (event) => {
				event.stopPropagation();
				await navigator.clipboard.writeText(value);
				setCopied(true);
				setTimeout(() => setCopied(false), 1500);
			}}
		>
			{copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
		</Button>
	);
}

SettingList.Row = Row;
SettingList.Copy = Copy;
