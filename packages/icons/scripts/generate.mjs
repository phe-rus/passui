// Writes `src/icons/<name>.tsx` for every icon, `src/index.ts` and `icons.manifest.json`.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { icons } from "./icons.data.mjs";

const kebab = (name) =>
	name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const root = new URL("..", import.meta.url).pathname;
rmSync(`${root}src/icons`, { recursive: true, force: true });
mkdirSync(`${root}src/icons`, { recursive: true });

const names = Object.keys(icons).sort();
let index = 'export * from "./create-icon";\n';
for (const name of names) {
	const [primary, secondary] = icons[name];
	const file = kebab(name);
	writeFileSync(
		`${root}src/icons/${file}.tsx`,
		`import { createIcon } from "../create-icon";\n\nexport const ${name}Icon = /* @__PURE__ */ createIcon(\n\t"${name}Icon",\n\t"${primary}",\n\t"${secondary}",\n);\n`,
	);
	index += `export * from "./icons/${file}";\n`;
}
writeFileSync(`${root}src/index.ts`, index);
writeFileSync(
	`${root}icons.manifest.json`,
	`${JSON.stringify(
		names.map((n) => `${n}Icon`),
		null,
		"\t",
	)}\n`,
);
console.log(`generated ${names.length} icons`);
