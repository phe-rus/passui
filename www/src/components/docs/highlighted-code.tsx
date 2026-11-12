import { CopyIcon } from "@passui/icons/copy";
import { Button } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import { useCopyText } from "@/lib/use-copy-text";

/**
 * Server highlighted code in an editor style frame: an optional file name strip,
 * a line gutter on anything longer than one line and a copy button. `source` is
 * the exact text copied. Colors come from the accent roles, so the frame follows
 * whichever accent the page wears.
 */
export function HighlightedCode({
	html,
	source,
	title,
}: {
	html: string;
	source?: string;
	title?: string;
}) {
	const copy = useCopyText();
	const numbered = (html.match(/class="line"/g)?.length ?? 0) > 1;
	return (
		<figure className="border-accent/15 bg-accent-soft/60 relative m-0 overflow-hidden rounded-2xl border">
			{title ? (
				<figcaption className="border-accent/15 text-caption text-label-secondary flex h-9 items-center border-b px-4 font-mono">
					{title}
				</figcaption>
			) : null}
			<div
				className={cn(
					"text-footnote no-scrollbar overflow-x-auto py-3 [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:px-4",
					numbered && "code-numbered",
				)}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			{source ? (
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Copy code"
					className={cn("absolute end-1.5", title ? "top-0.5" : "top-1.5")}
					onClick={() => copy(source, "Code copied")}
				>
					<CopyIcon size={14} />
				</Button>
			) : null}
		</figure>
	);
}
