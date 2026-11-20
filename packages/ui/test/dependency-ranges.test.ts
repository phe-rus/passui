import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

const manifest = (name: string) =>
	JSON.parse(
		readFileSync(
			new URL(`../../${name}/package.json`, import.meta.url),
			"utf8",
		),
	) as { version: string; dependencies?: Record<string, string> };

/** `^0.2.0` accepts 0.2.x on a 0.x line and 1.x.y on a 1.x line. */
function caretAccepts(range: string, version: string) {
	const [, floor = ""] = range.match(/^\^(\d+\.\d+\.\d+)$/) ?? [];
	const [fMajor = 0, fMinor = 0, fPatch = 0] = floor.split(".").map(Number);
	const [major = 0, minor = 0, patch = 0] = version.split(".").map(Number);
	if (!floor || major !== fMajor) return false;
	if (major === 0) return minor === fMinor && patch >= fPatch;
	return minor > fMinor || (minor === fMinor && patch >= fPatch);
}

it("depends on tokens and icons through explicit ranges the workspace satisfies", () => {
	const { dependencies = {} } = manifest("ui");
	for (const name of ["tokens", "icons"]) {
		const range = dependencies[`@passui/${name}`] ?? "";
		expect(range).not.toContain("workspace:");
		expect(caretAccepts(range, manifest(name).version)).toBe(true);
	}
});
