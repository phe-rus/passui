import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { getCatalog } from "@/domains/catalog/get-catalog";
import { resolveProps } from "@/domains/catalog/resolve-props";
import { getSnippet } from "@/domains/playground/get-snippet";

/** Compile copied code as an independent consumer, without the website's router types. */
test("every playground snippet typechecks against the public package exports", () => {
	const root = join(import.meta.dirname, "..");
	const directory = mkdtempSync(join(root, "test/.snippets-"));
	try {
		writeFileSync(
			join(directory, "tsconfig.json"),
			JSON.stringify({
				extends: "../../tsconfig.json",
				include: ["*.tsx"],
				compilerOptions: {
					types: ["react"],
					noUnusedLocals: true,
					noUnusedParameters: true,
				},
			}),
		);
		for (const { docs } of getCatalog()) {
			const cases: Record<string, unknown>[] = [{}];
			for (const [name, control] of Object.entries(docs.controls)) {
				if (!control) continue;
				for (const value of control.kind === "select"
					? Object.keys(control.options)
					: control.kind === "boolean"
						? [!control.default]
						: ['Quotes " & <tags> {braces}'])
					cases.push({ [name]: value });
			}
			for (const [index, raw] of cases.entries())
				writeFileSync(
					join(directory, `${docs.slug}-${index}.tsx`),
					getSnippet(docs, resolveProps(docs, raw)),
				);
		}
		let diagnostics = "";
		try {
			execFileSync(
				process.execPath,
				[
					join(root, "node_modules/typescript/bin/tsc"),
					"--project",
					join(directory, "tsconfig.json"),
				],
				{ encoding: "utf8", timeout: 90000, stdio: "pipe" },
			);
		} catch (error) {
			const failure = error as { stdout?: string; stderr?: string };
			diagnostics = failure.stdout || failure.stderr || String(error);
		}
		expect(diagnostics).toBe("");
	} finally {
		rmSync(directory, { recursive: true, force: true });
	}
}, 100000);
