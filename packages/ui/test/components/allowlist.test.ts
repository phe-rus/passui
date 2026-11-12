import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { importGraph } from "../helpers/import-graph";

const allowlist: Record<string, { packages: string[]; local: string[] }> =
	JSON.parse(
		readFileSync(new URL("../../allowlist.json", import.meta.url), "utf8"),
	);

for (const [entry, allowed] of Object.entries(allowlist)) {
	it(`${entry} imports only what its allow list names`, () => {
		const graph = importGraph(entry);
		expect(graph.packages).toEqual([...allowed.packages].sort());
		expect(graph.local).toEqual([...allowed.local].sort());
	});
}
