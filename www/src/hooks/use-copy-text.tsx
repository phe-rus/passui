import { copyText } from "@passui/react/clipboard";
import { Button } from "@passui/react/legacy/button";
import { Sheet } from "@passui/react/legacy/sheet";
import { TextEditor } from "@passui/react/text-editor";
import { toast } from "@passui/react/toast";
import { useState } from "react";

/** Keep the requested text accessible when the browser refuses clipboard access. */
export function useCopyText() {
	const [manualText, setManualText] = useState<string | null>(null);

	async function copy(text: string, message: string) {
		if (await copyText(text)) {
			toast.success(message);
			return true;
		}
		setManualText(text);
		return false;
	}

	const fallback = (
		<Sheet
			open={manualText !== null}
			onClose={() => setManualText(null)}
			label="Copy text"
		>
			<div className="flex flex-col gap-4 p-6">
				<h2 className="text-title3 text-label font-semibold">Copy text</h2>
				<p className="text-callout text-label-secondary">
					Your browser could not copy automatically. Select the text below, then
					use your device’s Copy command.
				</p>
				<TextEditor
					aria-label="Text to copy"
					readOnly
					value={manualText ?? ""}
					onFocus={(event) => event.currentTarget.select()}
					className="bg-fill text-footnote text-label focus-visible:outline-accent-text min-h-48 w-full rounded-lg p-3 font-mono focus-visible:outline-2"
				/>
				<div className="flex justify-end">
					<Button onClick={() => setManualText(null)}>Done</Button>
				</div>
			</div>
		</Sheet>
	);

	return { copy, fallback };
}
