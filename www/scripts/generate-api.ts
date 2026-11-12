/**
 * Builds the props tables from the built declarations of `@passui/react`.
 * Reads `packages/ui/dist/<slug>.d.ts` through the TypeScript checker, so a prop's
 * type, default (`@default`) and description (JSDoc) always match the source.
 * Run after `bun run --cwd packages/ui build`; the result is committed.
 */
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript-api";
import { registry } from "../src/features/components/registry";

const root = resolve(import.meta.dirname, "../..");
const dist = `${root}/packages/ui/dist`;
const entries = registry
	.map((doc) => `${dist}/${doc.entry}.d.ts`)
	.filter((file) => existsSync(file));

const program = ts.createProgram(entries, {
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	module: ts.ModuleKind.ESNext,
	target: ts.ScriptTarget.ES2022,
	jsx: ts.JsxEmit.ReactJSX,
	skipLibCheck: true,
	types: [],
	baseUrl: root,
});
const checker = program.getTypeChecker();

type Prop = {
	name: string;
	type: string;
	default?: string;
	description: string;
	required: boolean;
};
type Part = { name: string; description: string; props: Prop[] };

const own = (symbol: ts.Symbol) =>
	(symbol.declarations ?? []).some(
		(d) =>
			!/@types\/react|\/typescript|lib\.[\w.]*d\.ts/.test(
				d.getSourceFile().fileName,
			),
	);
const text = (parts: ts.SymbolDisplayPart[]) =>
	ts.displayPartsToString(parts).trim();

function propsOf(type: ts.Type, at: ts.Node): Prop[] {
	return checker
		.getPropertiesOfType(type)
		.filter(own)
		.map((symbol) => {
			const tags = symbol.getJsDocTags(checker);
			const def = tags.find((t) => t.name === "default");
			const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
			const propType = checker.getTypeOfSymbolAtLocation(
				symbol,
				declaration ?? at,
			);
			return {
				name: symbol.getName(),
				type: checker
					.typeToString(
						propType,
						undefined,
						ts.TypeFormatFlags.NoTruncation |
							ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
					)
					.replace(/ \| undefined$/, ""),
				default: def
					? text(def.text ?? []).replace(/^"?|"?$/g, (m) => m)
					: undefined,
				description: text(symbol.getDocumentationComment(checker)),
				required: !(symbol.flags & ts.SymbolFlags.Optional),
			};
		})
		.sort(
			(a, b) =>
				Number(b.required) - Number(a.required) || a.name.localeCompare(b.name),
		);
}

const out: Record<string, Part[]> = {};
for (const doc of registry) {
	const file = program.getSourceFile(`${dist}/${doc.entry}.d.ts`);
	if (!file) continue;
	const moduleSymbol = checker.getSymbolAtLocation(file);
	if (!moduleSymbol) continue;
	const parts: Part[] = [];
	for (const exp of checker.getExportsOfModule(moduleSymbol)) {
		const name = exp.getName();
		if (
			!/^[A-Z]/.test(name) ||
			name.endsWith("Props") ||
			/^[A-Z][A-Z_]+$/.test(name)
		)
			continue;
		const target =
			exp.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exp) : exp;
		if (!(target.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable)))
			continue;
		const declaration = target.valueDeclaration ?? target.declarations?.[0];
		if (!declaration) continue;
		const type = checker.getTypeOfSymbolAtLocation(target, declaration);
		const signature = type.getCallSignatures()[0];
		const first = signature?.getParameters()[0];
		if (!first) {
			parts.push({
				name,
				description: text(target.getDocumentationComment(checker)),
				props: [],
			});
			continue;
		}
		const paramType = checker.getTypeOfSymbolAtLocation(first, declaration);
		parts.push({
			name,
			description: text(target.getDocumentationComment(checker)),
			props: propsOf(paramType, declaration),
		});
	}
	out[doc.slug] = parts;
}
writeFileSync(
	`${import.meta.dirname}/../src/features/components/api.generated.json`,
	`${JSON.stringify(out, null, "\t")}\n`,
);
console.log(`props for ${Object.keys(out).length} components`);
void readdirSync;
