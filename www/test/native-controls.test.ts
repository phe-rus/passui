import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "@babel/parser";
import { expect, test } from "vitest";

/** Semantic document elements stay HTML; existing Passui controls own interactive UI. */
test("website JSX uses Passui controls and table parts", () => {
	const root = join(import.meta.dirname, "../src");
	const replaced = new Set([
		"button",
		"input",
		"textarea",
		"select",
		"table",
		"thead",
		"tbody",
		"tfoot",
		"tr",
		"th",
		"td",
		"caption",
		"progress",
		"hr",
		"details",
		"summary",
	]);
	const violations: string[] = [];
	function visit(value: unknown, file: string) {
		if (!value || typeof value !== "object") return;
		if (Array.isArray(value)) {
			for (const node of value) visit(node, file);
			return;
		}
		const node = value as Record<string, unknown>;
		const name = node.name as { type?: string; name?: string } | undefined;
		if (
			node.type === "JSXOpeningElement" &&
			name?.type === "JSXIdentifier" &&
			replaced.has(name.name ?? "")
		)
			violations.push(`${file}: <${name?.name}>`);
		for (const [key, child] of Object.entries(node))
			if (key !== "loc") visit(child, file);
	}
	for (const file of globSync("**/*.tsx", { cwd: root }))
		visit(
			parse(readFileSync(join(root, file), "utf8"), {
				sourceType: "module",
				plugins: ["typescript", "jsx"],
			}),
			file,
		);
	expect(violations).toEqual([]);
});
