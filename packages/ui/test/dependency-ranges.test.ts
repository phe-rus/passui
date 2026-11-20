import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

const manifest = (name: string) =>
	JSON.parse(
		readFileSync(
			new URL(`../../${name}/package.json`, import.meta.url),
			"utf8",
		),
	) as { version: string; dependencies?: Record<string, string> };

it("depends on the current tokens and icons releases, never workspace ranges", () => {
	const { dependencies = {} } = manifest("ui");
	for (const name of ["tokens", "icons"]) {
		const range = dependencies[`@passui/${name}`] ?? "";
		expect(range).not.toContain("workspace:");
		expect(range).toBe(`^${manifest(name).version}`);
	}
});
