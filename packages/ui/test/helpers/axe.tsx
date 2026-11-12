import { act, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { expect } from "vitest";
import { axe } from "vitest-axe";

(
	globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

/** Lets Zag effects and animation frames run. */
export async function settle() {
	await act(async () => {
		await new Promise((resolve) => setTimeout(resolve, 60));
	});
}

/** Renders into jsdom and fails on any axe violation. Contrast is covered by tokens. */
export async function expectNoA11yViolations(
	ui: ReactElement,
	{ portal = false }: { portal?: boolean } = {},
) {
	const host = document.createElement("div");
	document.body.append(host);
	const root = createRoot(host);
	await act(async () => root.render(ui));
	if (portal) await settle();
	// Overlays render into document.body, so they are scanned from there.
	const results = await axe(portal ? document.body : host, {
		rules: { "color-contrast": { enabled: false } },
	});
	const messages = results.violations.map((v) => `${v.id}: ${v.help}`);
	await act(async () => root.unmount());
	host.remove();
	document.body.innerHTML = "";
	expect(messages).toEqual([]);
}

export { act };
