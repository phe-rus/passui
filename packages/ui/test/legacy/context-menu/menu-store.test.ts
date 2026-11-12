import { afterEach, expect, test, vi } from "vitest";
import {
	closeContextMenu,
	getContextMenu,
	openMenu,
} from "../../../src/legacy/context-menu/context-menu-store";

afterEach(() => {
	closeContextMenu(false);
	vi.unstubAllGlobals();
});

test("anchored menus expand from the control's bounds in either direction", () => {
	vi.stubGlobal("getComputedStyle", () => ({ direction: "ltr" }));
	const anchor = {
		getBoundingClientRect: () => ({
			left: 40,
			right: 120,
			top: 100,
			bottom: 136,
			width: 80,
			height: 36,
		}),
	} as Element;
	openMenu(anchor, []);
	expect(getContextMenu()).toMatchObject({ x: 40, y: 100, alignY: "top" });
	openMenu(anchor, [], { above: true, edge: "trailing" });
	expect(getContextMenu()).toMatchObject({ x: 120, y: 136, alignY: "bottom" });
});
