import { toast, useContextMenu } from "@passui/react";
import { copyText } from "@passui/react/clipboard";

export function ContextMenuUsage() {
	// render one <ContextMenuHost /> near the root of your app
	const menu = useContextMenu(() => [
		{
			label: "Copy link",
			onSelect: async () => {
				if (await copyText(window.location.href)) toast.success("Link copied");
				else toast.error("Could not copy the link");
			},
		},
		{
			label: "Open in new tab",
			onSelect: () => toast("Opened"),
		},
	]);

	return (
		<div
			{...menu}
			className="bg-fill/60 text-callout text-label rounded-3xl px-6 py-4 select-none"
		>
			Right-click this card
		</div>
	);
}
