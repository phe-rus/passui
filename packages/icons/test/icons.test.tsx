import { readdirSync, readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import * as all from "../src/index";
import { HomeIcon, SearchIcon } from "../src/index";

const manifest: string[] = JSON.parse(
	readFileSync(`${import.meta.dirname}/../icons.manifest.json`, "utf8"),
);

it("exports exactly the frozen manifest", () => {
	const exported = Object.keys(all)
		.filter((k) => k.endsWith("Icon") && k !== "createIcon")
		.sort();
	expect(exported).toEqual([...manifest].sort());
});

it("ships one subpath file per icon", () => {
	const files = readdirSync(`${import.meta.dirname}/../src/icons`);
	expect(files).toHaveLength(manifest.length);
});

it("hides decorative icons and names meaningful ones", () => {
	expect(renderToStaticMarkup(<HomeIcon />)).toContain('aria-hidden="true"');
	const named = renderToStaticMarkup(<HomeIcon title="Home" />);
	expect(named).toContain('role="img"');
	expect(named).toContain('aria-label="Home"');
});

it("draws duo detail softened and mono at full strength", () => {
	expect(renderToStaticMarkup(<SearchIcon tone="duo" />)).toContain(
		"--icon-secondary",
	);
	expect(renderToStaticMarkup(<SearchIcon />)).not.toContain(
		"--icon-secondary",
	);
});

it("sets animation by data attribute", () => {
	expect(renderToStaticMarkup(<HomeIcon animate="spin" />)).toContain(
		'data-icon-animate="spin"',
	);
});
