import { SegmentedControl } from "@passui/react/segmented-control";
import { useState } from "react";
import type { ExampleDoc } from "@/features/components/types";
import { HighlightedCode } from "./highlighted-code";
import { PreviewStage } from "./stage";

/** One example as its own anchored section: Preview and Code in a segmented control. */
export function ExampleBlock({
	example,
	code,
}: {
	example: ExampleDoc;
	code?: { html: string; source: string };
}) {
	const { id, title, description, Demo } = example;
	const [view, setView] = useState("preview");
	return (
		<section
			aria-labelledby={`example-${id}`}
			className="flex scroll-mt-24 flex-col gap-3"
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
			<div className="flex">
				<SegmentedControl
					aria-label={`${title} view`}
					value={view}
					onValueChange={setView}
					options={[
						{ value: "preview", label: "Preview" },
						{ value: "code", label: "Code" },
					]}
				/>
			</div>
			{view === "preview" ? (
				<PreviewStage>
					<Demo />
				</PreviewStage>
			) : code ? (
				<HighlightedCode
					html={code.html}
					source={code.source}
					title={`${id}.tsx`}
				/>
			) : null}
		</section>
	);
}
