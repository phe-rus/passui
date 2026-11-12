import { Button } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import { useId, useState } from "react";
import type { ExampleDoc } from "@/features/components/types";
import { HighlightedCode } from "./highlighted-code";
import { PreviewStage } from "./stage";

/** Code shorter than this shows in full; longer code starts folded under the preview. */
const FOLD_AFTER_LINES = 8;

/**
 * One example as its own anchored section: the live preview, with its code folded
 * underneath. Long code opens with "View Code" and folds again with "Hide code".
 */
export function ExampleBlock({
	example,
	code,
}: {
	example: ExampleDoc;
	code?: { html: string; source: string };
}) {
	const { id, title, description, Demo } = example;
	const codeId = useId();
	const [open, setOpen] = useState(false);
	const foldable =
		code !== undefined && code.source.split("\n").length > FOLD_AFTER_LINES;
	const folded = foldable && !open;
	return (
		<section
			aria-labelledby={`example-${id}`}
			className="flex scroll-mt-16 flex-col gap-3"
		>
			<h3 id={`example-${id}`} className="group text-title3 font-semibold">
				{title}
				<a
					href={`#example-${id}`}
					aria-label={`Link to ${title}`}
					className="text-label-tertiary ms-2 no-underline opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
				>
					#
				</a>
			</h3>
			<p className="text-subheadline text-label-secondary">{description}</p>
			<PreviewStage>
				<Demo />
			</PreviewStage>
			{code ? (
				<div className="relative">
					<div
						id={codeId}
						className={cn("overflow-hidden rounded-2xl", folded && "max-h-44")}
					>
						<HighlightedCode
							html={code.html}
							source={code.source}
							title={`${id}.tsx`}
						/>
					</div>
					{folded ? (
						<div className="from-accent-soft pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center rounded-b-2xl bg-linear-to-t to-transparent pb-3">
							<Button
								variant="secondary"
								size="sm"
								className="pointer-events-auto"
								aria-expanded={false}
								aria-controls={codeId}
								onClick={() => setOpen(true)}
							>
								View Code
							</Button>
						</div>
					) : foldable ? (
						<div className="flex justify-center pt-2">
							<Button
								variant="ghost"
								size="sm"
								aria-expanded
								aria-controls={codeId}
								onClick={() => setOpen(false)}
							>
								Hide code
							</Button>
						</div>
					) : null}
				</div>
			) : null}
		</section>
	);
}
