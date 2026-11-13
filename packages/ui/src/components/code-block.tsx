"use client";

import { CheckIcon } from "@passui/icons/check";
import { CopyIcon } from "@passui/icons/copy";
import {
	type ComponentProps,
	Fragment,
	type ReactNode,
	useEffect,
	useId,
	useState,
} from "react";
import { Button } from "../../components/button";
import { cn } from "../../lib/class-names";
import { copyText } from "../../lib/clipboard";
import { haptic } from "../../lib/haptics";

export type CodeBlockSize = "sm" | "md" | "lg";

export interface CodeBlockProps
	extends Omit<ComponentProps<"div">, "children" | "size" | "title"> {
	code: string;
	/** Supply a highlighter's rendered pre/code element; source remains the fallback. */
	children?: ReactNode;
	/** Show a nonselectable line gutter. @default true */
	lineNumbers?: boolean;
	/** Code font size, padding and line gutter scale. @default "md" */
	size?: CodeBlockSize;
	/** A caption over the code, such as a file name. */
	title?: string;
	/** Replaces the caption with your own content, such as a tab strip that fills the row's height. */
	header?: ReactNode;
	/** The language's name, shown beside the caption. */
	language?: string;
	/** Show a copy button that writes `code`. @default false */
	copyable?: boolean;
	/** 1 based lines to mark with a soft accent band, for the lines a paragraph is about. */
	highlightLines?: number[];
	/** Wrap long lines instead of scrolling sideways. @default false */
	wrap?: boolean;
	/** Names for the copy button and the fold button, so apps can translate them. */
	labels?: { copy: string; copied: string; expand: string; collapse: string };
	/** Start folded, with an Expand code button, when the code has more lines than this. */
	foldAfter?: number;
}

/** Code presentation without shipping a highlighter or formatter to consumers. */
export function CodeBlock({
	code,
	children,
	lineNumbers = true,
	size = "md",
	title,
	header,
	language,
	copyable = false,
	foldAfter,
	highlightLines,
	wrap = false,
	labels = {
		copy: "Copy code",
		copied: "Copied",
		expand: "Expand code",
		collapse: "Collapse code",
	},
	className,
	...props
}: CodeBlockProps) {
	const scope = useId();
	const lines = code.split("\n");
	const foldable = foldAfter !== undefined && lines.length > foldAfter;
	const [expanded, setExpanded] = useState(false);
	const [copied, setCopied] = useState(false);
	const folded = foldable && !expanded;

	useEffect(() => {
		if (!copied) return;
		const timer = window.setTimeout(() => setCopied(false), 1600);
		return () => window.clearTimeout(timer);
	}, [copied]);

	async function copy() {
		if (await copyText(code)) {
			haptic("success");
			setCopied(true);
		}
	}

	return (
		<div
			{...props}
			className={cn("passui-code-block relative", className)}
			data-line-numbers={lineNumbers || undefined}
			data-size={size}
			data-wrap={wrap || undefined}
			data-code-block={scope}
		>
			{highlightLines?.length ? (
				<style>
					{highlightLines
						.map(
							(line) =>
								`[data-code-block="${scope}"] code > .line:nth-child(${line}){background:color-mix(in srgb,var(--color-accent) 14%,transparent);box-shadow:inset 2px 0 0 var(--color-accent)}`,
						)
						.join("")}
				</style>
			) : null}
			{title || header || language || copyable ? (
				<div
					className={cn(
						"border-separator/60 flex min-h-9 items-center justify-between gap-3 border-b px-4",
						!header && "py-2",
					)}
				>
					{header ?? (
						<span className="text-caption text-label-tertiary min-w-0 truncate font-mono">
							{title}
						</span>
					)}
					<div className="flex shrink-0 items-center gap-1.5">
						{language ? (
							<span className="bg-fill/70 text-caption2 text-label-secondary rounded-full px-2 py-1 font-medium">
								{language}
							</span>
						) : null}
						{copyable ? (
							<Button
								variant="ghost"
								size="icon-xs"
								aria-label={copied ? labels.copied : labels.copy}
								onClick={copy}
							>
								{copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
							</Button>
						) : null}
					</div>
				</div>
			) : null}
			<div className={cn("relative", folded && "max-h-36 overflow-hidden")}>
				{children ?? (
					<pre>
						<code>
							{lines.map((line, index) => (
								<Fragment key={line || index}>
									<span className="line">{line || " "}</span>
									{index < lines.length - 1 ? "\n" : null}
								</Fragment>
							))}
						</code>
					</pre>
				)}
				{folded ? (
					<div className="from-elevated pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent" />
				) : null}
			</div>
			{foldable ? (
				<div
					className={cn(
						"flex justify-center",
						folded ? "absolute inset-x-0 bottom-3" : "pb-4",
					)}
				>
					<Button
						size="sm"
						variant="secondary"
						aria-expanded={expanded}
						onClick={() => {
							haptic("selection");
							setExpanded((value) => !value);
						}}
					>
						{expanded ? labels.collapse : labels.expand}
					</Button>
				</div>
			) : null}
		</div>
	);
}
