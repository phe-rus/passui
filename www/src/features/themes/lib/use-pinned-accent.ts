import { type AccentId, accents } from "@passui/react/tokens";
import { useEffect } from "react";

export const accentIds = Object.keys(accents) as AccentId[];

function applyAccent(accent: AccentId) {
	const root = document.documentElement;
	// Blush is the root default, so it needs no attribute.
	if (accent === "blush") root.removeAttribute("data-accent");
	else root.setAttribute("data-accent", accent);
}

/** Applies the page's accent. Leaving the page restores Blush. */
export function usePinnedAccent(accent: AccentId) {
	useEffect(() => {
		applyAccent(accent);
	}, [accent]);
	useEffect(() => () => applyAccent("blush"), []);
}
