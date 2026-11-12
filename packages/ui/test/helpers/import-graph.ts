import { existsSync, readFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const specifier = /(?:from|import)\s*["']([^"']+)["']/g;
const extensions = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

/** Every package and local file an entry reaches through static imports. */
export function importGraph(entry: string) {
	const packages = new Set<string>();
	const local = new Set<string>();
	const queue = [resolve(root, entry)];
	while (queue.length > 0) {
		const file = queue.pop() as string;
		const key = relative(root, file);
		if (local.has(key)) continue;
		local.add(key);
		for (const [, from] of readFileSync(file, "utf8").matchAll(specifier)) {
			if (!from) continue;
			if (!from.startsWith(".")) {
				packages.add(
					from.startsWith("@")
						? from.split("/").slice(0, 2).join("/")
						: (from.split("/")[0] as string),
				);
				continue;
			}
			const base = resolve(dirname(file), from);
			const found = extensions
				.map((ext) => base + ext)
				.find((path) => existsSync(path) && /\.tsx?$/.test(path));
			if (found) queue.push(found);
		}
	}
	return { packages: [...packages].sort(), local: [...local].sort() };
}
