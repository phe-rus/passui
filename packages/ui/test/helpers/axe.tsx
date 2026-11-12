import { act, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { expect } from "vitest";
import { axe } from "vitest-axe";

(
	globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

/** Renders into jsdom and fails on any axe violation. Contrast is covered by tokens. */
export async function expectNoA11yViolations(ui: ReactElement) {
	const host = document.createElement("div");
	document.body.append(host);
	const root = createRoot(host);
	await act(async () => root.render(ui));
	const results = await axe(host, {
		rules: { "color-contrast": { enabled: false } },
	});
	const messages = results.violations.map((v) => `${v.id}: ${v.help}`);
	await act(async () => root.unmount());
	host.remove();
	expect(messages).toEqual([]);
}

export { act };
