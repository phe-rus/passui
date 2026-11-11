import { useState } from "react";
import { SparkleIcon } from "@passui/react/icons";
import { Button } from "@passui/react/button";
import { haptic } from "@passui/react";
import { useCopyText } from "@/domains/clipboard/use-copy-text";
import { getEntry } from "@/domains/catalog/get-catalog";
import { getComponentMarkdown } from "../get-ai-context";

/** Copies one component's docs as Markdown, for pasting into an AI chat. */
export function CopyForAi({ slug }: { slug: string }) {
	const clipboard = useCopyText();
	const [pending, setPending] = useState(false);
	const [failed, setFailed] = useState(false);
	async function copy() {
		setPending(true);
		setFailed(false);
		try {
			const entry = getEntry(slug);
			if (!entry) return;
			const copied = await clipboard.copy(
				await getComponentMarkdown(entry, window.location.origin),
				"Copied as Markdown",
			);
			if (copied) haptic("success");
		} catch {
			setFailed(true);
		} finally {
			setPending(false);
		}
	}

	return (
		<>
			<Button
				type="button"
				size="sm"
				variant="secondary"
				isPending={pending}
				onClick={copy}
			>
				<SparkleIcon size={14} />
				Copy for AI
			</Button>
			{failed && (
				<span role="status" className="text-footnote text-danger">
					Source could not load. Try copying again.
				</span>
			)}
			{clipboard.fallback}
		</>
	);
}
