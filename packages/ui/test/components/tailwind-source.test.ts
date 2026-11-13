import { compile } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
import { expect, it } from "vitest";

const base = new URL("../..", import.meta.url).pathname;

it("generates Button classes from the compiled package through tokens styles.css", async () => {
	const compiler = await compile('@import "@passui/tokens/styles.css";', {
		base,
		onDependency() {},
	});
	const scanner = new Scanner({
		sources: compiler.sources.map(({ base: from, pattern, negated }) => ({
			base: from,
			pattern,
			negated,
		})),
	});
	const css = compiler.build(scanner.scan());
	expect(css).toContain(".rounded-full");
	expect(css).toContain(".bg-inverse");
	expect(css).toContain(".size-8\\.5");
	// Only the new Button uses this class.
	expect(css).toContain(".ease-standard");
});
