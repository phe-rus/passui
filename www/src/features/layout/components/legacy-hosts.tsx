import { ContextMenuHost, DialogHost, TooltipHost } from "@passui/react";

/** Mounts the store based overlays that the older catalog pages still use. */
export default function LegacyHosts() {
	return (
		<>
			<ContextMenuHost />
			<DialogHost />
			<TooltipHost />
		</>
	);
}
