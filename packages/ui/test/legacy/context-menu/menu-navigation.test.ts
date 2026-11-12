import { expect, test } from "vitest";
import {
	findMenuTypeaheadIndex,
	isMenuNavigationKey,
	nextMenuIndex,
} from "../../../src/legacy/context-menu/menu-navigation";

test("only navigation keys enter the menu navigation model", () => {
	expect(isMenuNavigationKey("ArrowUp")).toBe(true);
	expect(isMenuNavigationKey("Enter")).toBe(false);
});

test("menu arrow keys wrap through enabled actions", () => {
	expect(nextMenuIndex("ArrowDown", -1, 3)).toBe(0);
	expect(nextMenuIndex("ArrowDown", 2, 3)).toBe(0);
	expect(nextMenuIndex("ArrowUp", 0, 3)).toBe(2);
	expect(nextMenuIndex("ArrowUp", -1, 3)).toBe(2);
});

test("home and end select the first and last enabled actions", () => {
	expect(nextMenuIndex("Home", 2, 4)).toBe(0);
	expect(nextMenuIndex("End", 0, 4)).toBe(3);
});

test("empty menus have no keyboard destination", () => {
	expect(nextMenuIndex("ArrowDown", -1, 0)).toBe(-1);
	expect(nextMenuIndex("End", -1, 0)).toBe(-1);
});

test("typeahead matches labels, wraps, and excludes unmatched actions", () => {
	const labels = ["Archive", "Copy", "Customize", "Delete"];
	expect(findMenuTypeaheadIndex(labels, "c", -1)).toBe(1);
	expect(findMenuTypeaheadIndex(labels, "c", 1)).toBe(2);
	expect(findMenuTypeaheadIndex(labels, "cu", 2)).toBe(2);
	expect(findMenuTypeaheadIndex(labels, "a", 3)).toBe(0);
	expect(findMenuTypeaheadIndex(labels, "z", 0)).toBe(-1);
	expect(findMenuTypeaheadIndex(labels, "", 0)).toBe(-1);
});
