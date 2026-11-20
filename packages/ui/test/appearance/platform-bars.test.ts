// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import {
	refreshBars,
	refreshBarsAfterOverlays,
} from "../../src/appearance/platform";

afterEach(() => {
	document.body.innerHTML = "";
	document.documentElement.removeAttribute("style");
	vi.restoreAllMocks();
});

it("hides and restores the root inside one call", () => {
	document.documentElement.style.display = "block";
	refreshBars();
	expect(document.documentElement.style.display).toBe("block");
});

it("refreshes once the last overlay backdrop leaves the page", async () => {
	const frames: FrameRequestCallback[] = [];
	vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
		frames.push(cb);
		return frames.length;
	});
	vi.stubGlobal("cancelAnimationFrame", () => {});
	const overlay = document.createElement("div");
	overlay.setAttribute("data-slot", "dialog-overlay");
	document.body.append(overlay);
	const stop = refreshBarsAfterOverlays(document.body);

	overlay.remove();
	await Promise.resolve();
	expect(frames).toHaveLength(1);
	frames[0]?.(0);
	expect(document.documentElement.style.display).toBe("");

	document.body.append(document.createElement("p"));
	await Promise.resolve();
	expect(frames).toHaveLength(1);
	stop();
	vi.unstubAllGlobals();
});
