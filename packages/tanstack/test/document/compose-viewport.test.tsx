import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import {
	ComposeViewport,
	themeColorMeta,
	viewportMeta,
} from "../../src/document";

const render = (props: Parameters<typeof ComposeViewport.Window>[0]) =>
	renderToStaticMarkup(<ComposeViewport.Window {...props} />);

test("the window fixes the body and scrolls inside main by default", () => {
	const html = render({ children: "page" });
	expect(html).toContain("fixed");
	expect(html).toContain("h-svh");
	expect(html).toContain("overflow-auto");
	expect(html).not.toContain("edge-shim");
});

test("document scroll lets the page itself scroll", () => {
	const html = render({ children: "page", scroll: "document" });
	expect(html).toContain("min-h-dvh");
	expect(html).toContain("overflow-x-clip");
	expect(html).toContain("overflow-visible");
	expect(html).not.toContain("h-svh");
	expect(html).not.toMatch(/class="[^"]*\bfixed\b/);
});

test("the edge shim is opt in and renders after main, before the slot", () => {
	const html = render({
		children: "page",
		edgeShim: true,
		after: <i id="after" />,
	});
	expect(html).toContain('data-slot="edge-shim"');
	expect(html).toContain('aria-hidden="true"');
	expect(html.indexOf("edge-shim")).toBeLessThan(html.indexOf('id="after"'));
});

test("the viewport meta covers the safe areas", () => {
	expect(viewportMeta.content).toContain("viewport-fit=cover");
});

test("theme colour is emitted per colour scheme", () => {
	const [light, dark] = themeColorMeta({ light: "#fff", dark: "#000" });
	expect(light).toMatchObject({
		content: "#fff",
		media: "(prefers-color-scheme: light)",
	});
	expect(dark).toMatchObject({
		content: "#000",
		media: "(prefers-color-scheme: dark)",
	});
});
