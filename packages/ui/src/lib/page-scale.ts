import { useLayoutEffect } from "react";
import { frontOpenness, pageTransformAt } from "./drawer.math";

/** Open drawers and how open each is. The page follows the most open one. */
const layers = new Map<string, number>();
let dragging = new Set<string>();

function apply() {
	const page = document.querySelector<HTMLElement>("[data-passui-page]");
	if (!page) return;
	if (layers.size === 0) {
		for (const name of ["scale", "radius", "y"])
			page.style.removeProperty(`--passui-page-${name}`);
		page.removeAttribute("data-passui-page-active");
		page.removeAttribute("data-passui-page-dragging");
		return;
	}
	const t = pageTransformAt(frontOpenness(layers.values()), window.innerWidth);
	page.style.setProperty("--passui-page-scale", String(t.scale));
	page.style.setProperty("--passui-page-radius", `${t.radius}px`);
	page.style.setProperty("--passui-page-y", `${t.translateY}px`);
	page.setAttribute("data-passui-page-active", "");
	if (dragging.size > 0) page.setAttribute("data-passui-page-dragging", "");
	else page.removeAttribute("data-passui-page-dragging");
}

/**
 * Opt in page scaling for one drawer layer. Does nothing unless the app root
 * carries `data-passui-page`. Pass `active` while the drawer is mounted and
 * `openness` from 0 to 1, so the page eases back as the drawer leaves.
 */
export function usePageScale(
	id: string,
	active: boolean,
	openness: number,
	swiping: boolean,
) {
	useLayoutEffect(() => {
		if (!active) {
			layers.delete(id);
			dragging.delete(id);
			apply();
			return;
		}
		layers.set(id, openness);
		dragging = new Set(dragging);
		if (swiping) dragging.add(id);
		else dragging.delete(id);
		apply();
	}, [id, active, openness, swiping]);

	useLayoutEffect(
		() => () => {
			layers.delete(id);
			dragging.delete(id);
			apply();
		},
		[id],
	);
}
