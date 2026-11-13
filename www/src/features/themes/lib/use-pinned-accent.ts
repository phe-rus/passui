import { type AccentId, accents } from "@passui/react/tokens";
import { useEffect, useState } from "react";

export const accentIds = Object.keys(accents) as AccentId[];

function applyAccent(accent: AccentId) {
	const root = document.documentElement;
	// Blush is the root default, so it needs no attribute.
	if (accent === "blush") root.removeAttribute("data-accent");
	else root.setAttribute("data-accent", accent);
}

/** The page's accent, chosen by hand. Leaving the page restores Blush. */
export function usePinnedAccent(initial: AccentId = "blush") {
	const [accent, setAccent] = useState<AccentId>(initial);
	useEffect(() => {
		applyAccent(accent);
	}, [accent]);
	useEffect(() => () => applyAccent("blush"), []);
	return [accent, setAccent] as const;
}
