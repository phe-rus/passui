import { existsSync, readdirSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import api from "../src/features/catalog/api.generated.json";
import {
	getNavigation,
	getNeighbours,
} from "../src/features/catalog/navigation";
import { groups, registry } from "../src/features/catalog/registry";

const root = `${import.meta.dirname}/../src/features/catalog`;
const pascal = (s: string) =>
	s
		.split("-")
		.map((p) => p[0]?.toUpperCase() + p.slice(1))
		.join("");

it("has unique slugs, known groups and a built entry for each component", () => {
	const slugs = registry.map((c) => c.slug);
	expect(new Set(slugs).size).toBe(slugs.length);
	for (const c of registry) {
		expect(groups).toContain(c.group);
		expect(c.summary.length).toBeGreaterThan(10);
		expect(
			existsSync(
				`${import.meta.dirname}/../../packages/ui/src/components/${c.entry}.tsx`,
			) || existsSync(`${import.meta.dirname}/../../packages/ui/src/legacy`),
		).toBe(true);
	}
});

it("gives every component a definition with usage-style examples and notes", () => {
	for (const c of registry) {
		const file = `${root}/definitions/${c.slug}.tsx`;
		expect(existsSync(file), `${c.slug} definition`).toBe(true);
		const text = readFileSync(file, "utf8");
		expect(
			(text.match(/Demo:/g) ?? []).length,
			`${c.slug} examples`,
		).toBeGreaterThanOrEqual(2);
	}
});

it("keeps one example file per example, exporting the conventional name", () => {
	for (const c of registry) {
		const dir = `${root}/examples/${c.slug}`;
		const files = readdirSync(dir).filter((f) => f.endsWith(".tsx"));
		expect(files.length, c.slug).toBeGreaterThanOrEqual(2);
		for (const file of files) {
			const id = file.replace(/\.tsx$/, "");
			expect(
				readFileSync(`${dir}/${file}`, "utf8"),
				`${c.slug}/${id}`,
			).toContain(`export function ${pascal(c.slug)}${pascal(id)}(`);
		}
	}
});

it("has generated props for every component", () => {
	for (const c of registry)
		expect(
			(api as Record<string, unknown[]>)[c.slug]?.length,
			c.slug,
		).toBeGreaterThan(0);
});

it("lists guides then components in one reading order with neighbours", () => {
	const nav = getNavigation();
	expect(nav[0]?.title).toBe("Sections");
	expect(getNeighbours("/docs/introduction").next?.href).toBe(
		"/docs/installation",
	);
	expect(getNeighbours("/docs/components/accordion").previous).toBeDefined();
});
