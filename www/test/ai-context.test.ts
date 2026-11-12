import { expect, test } from "vitest";
import {
	getComponentMarkdown,
	getLlmsTxt,
	getSkillMarkdown,
} from "@/features/ai/lib/get-ai-context";
import { getCatalog, getEntry } from "@/features/catalog/lib/get-catalog";

test("both AI indexes link to every canonical component page", async () => {
	for (const text of [
		getLlmsTxt("https://passui.pherus.org"),
		getSkillMarkdown("https://passui.pherus.org"),
	])
		for (const { docs } of getCatalog())
			expect(text).toContain(
				`https://passui.pherus.org/components/react/${docs.slug}`,
			);
});

test("copied component context includes actual API callbacks and required host setup", async () => {
	const picker = await getComponentMarkdown(
		getEntry("picker") ?? (undefined as never),
		"https://passui.pherus.org",
	);
	expect(picker).toContain("## API reference");
	expect(picker).toContain("`onChange` (required)");
	expect(picker).toContain("`options` (required)");
	for (const slug of ["context-menu", "menu", "dialog", "toast", "tooltip"])
		expect(
			await getComponentMarkdown(
				getEntry(slug) ?? (undefined as never),
				"https://passui.pherus.org",
			),
		).toContain("## Setup");
});
