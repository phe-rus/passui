import { parse } from "@babel/parser";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import type { RegisteredDocs } from "@/features/catalog/data";
import type { PropValues } from "@/features/catalog/lib/resolve-props";
import { getCatalog } from "@/features/catalog/lib/get-catalog";
import { getExampleSource } from "@/features/catalog/lib/get-example-source";
import { resolveProps } from "@/features/catalog/lib/resolve-props";
import { getSnippet } from "@/features/playground/lib/get-snippet";

function PlaygroundDemo({
	docs,
	values,
}: {
	docs: RegisteredDocs;
	values: PropValues;
}) {
	return docs.render(values);
}

describe.each(getCatalog())("$docs.slug documentation", ({ docs, content }) => {
	test("has prose and at least two working examples beyond usage and showcase", async () => {
		expect(content.summary.trim()).not.toBe("");
		expect(content.usage.trim()).not.toBe("");
		expect(content.anatomy.length).toBeGreaterThan(0);
		expect(content.practices.length).toBeGreaterThan(0);
		expect(content.accessibility.length).toBeGreaterThan(0);
		expect(docs.examples.length).toBeGreaterThanOrEqual(2);
		for (const [id, Component] of [
			["usage", docs.usage],
			["showcase", docs.showcase],
			...docs.examples.map(
				(example) => [example.id, example.component] as const,
			),
		] as const) {
			expect((await getExampleSource(docs.slug, id)).trim(), id).not.toBe("");
			expect(renderToStaticMarkup(createElement(Component)), id).not.toBe("");
		}
		for (const example of docs.examples) {
			expect(
				content.examples[example.id]?.title.trim(),
				example.id,
			).toBeTruthy();
			expect(
				content.examples[example.id]?.description.trim(),
				example.id,
			).toBeTruthy();
		}
	});

	test("renders playground states and generates valid TSX for every control choice", () => {
		const cases: Record<string, unknown>[] = [{}];
		for (const [name, control] of Object.entries(docs.controls)) {
			if (!control) continue;
			expect(
				(content.propDescriptions as Record<string, string>)[name]?.trim(),
				name,
			).toBeTruthy();
			for (const value of control.kind === "select"
				? Object.keys(control.options)
				: control.kind === "boolean"
					? [true, false]
					: ['Quotes " & <tags> {braces}\nnew line', ""]) {
				cases.push({ [name]: value });
			}
		}
		for (const raw of cases) {
			const values = resolveProps(docs, raw);
			expect(
				() =>
					renderToStaticMarkup(<PlaygroundDemo docs={docs} values={values} />),
				JSON.stringify(raw),
			).not.toThrow();
			const code = getSnippet(docs, values);
			expect(
				() =>
					parse(code, { sourceType: "module", plugins: ["typescript", "jsx"] }),
				code,
			).not.toThrow();
		}
	});
});
