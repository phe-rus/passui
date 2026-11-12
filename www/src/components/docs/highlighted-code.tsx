import { CopyIcon } from "@passui/icons/copy";
import { Button } from "@passui/react/button";
import { useCopyText } from "@/lib/use-copy-text";

/** Server highlighted HTML with a copy button. `source` is the exact text copied. */
export function HighlightedCode({
	html,
	source,
}: {
	html: string;
	source?: string;
}) {
	const copy = useCopyText();
	return (
		<div className="bg-fill/50 relative rounded-2xl">
			<div
				className="text-footnote overflow-x-auto p-4 [&_pre]:m-0 [&_pre]:bg-transparent!"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			{source ? (
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Copy code"
					className="absolute end-2 top-2"
					onClick={() => copy(source, "Code copied")}
				>
					<CopyIcon size={14} />
				</Button>
			) : null}
		</div>
	);
}
