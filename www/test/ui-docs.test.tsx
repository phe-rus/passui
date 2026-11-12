import { existsSync, readdirSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import type { UiDoc } from "../src/features/ui-docs/types";

const docs = Object.values(
	import.meta.glob<{ doc: UiDoc }>("../src/features/ui-docs/docs/[!_]*.tsx", {
		eager: true,
	}),
).map((module) => module.doc);
const slugs = [
	"alert-dialog",
	"button",
	"dialog",
	"drawer",
	"dropdown-menu",
	"popover",
	"sheet",
	"tooltip",
];

test("lean docs cover the eight overlay and button pages", () => {
	expect(docs.map((doc) => doc.slug).sort()).toEqual(slugs);
});

test("every page has a route file, usage first, and a source file per example", () => {
	const examples = new URL(
		"../src/features/ui-docs/examples/",
		import.meta.url,
	);
	for (const doc of docs) {
		expect(
			existsSync(
				new URL(
					`../src/routes/_site/_docs/components/react/${doc.slug}.tsx`,
					import.meta.url,
				),
			),
		).toBe(true);
		expect(doc.examples[0]?.id).toBe("usage");
		for (const example of doc.examples)
			expect(readdirSync(examples)).toContain(`${doc.slug}-${example.id}.tsx`);
		expect(doc.parts.length).toBeGreaterThan(0);
		expect(doc.accessibility.length).toBeGreaterThan(2);
	}
});

test("every example renders on the server with only its trigger, never an open panel", () => {
	for (const doc of docs)
		for (const { Demo } of doc.examples) {
			const html = renderToString(createElement(Demo));
			expect(html.length).toBeGreaterThan(0);
			expect(html).not.toContain('role="dialog"');
			expect(html).not.toContain('role="menu"');
		}
});
