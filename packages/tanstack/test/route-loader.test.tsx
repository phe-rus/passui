import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { DefaultLoader } from "../src/route-boundary/default-loader";

test("route loading exposes translated status without visible copy or a viewport-sized wrapper", () => {
	const html = renderToStaticMarkup(<DefaultLoader label="Chargement" />);
	expect(html).toContain('role="status"');
	expect(html).toContain('aria-label="Chargement"');
	expect(html).toContain("animate-spin");
	expect(html).toContain("motion-reduce:animate-none");
	expect(html).not.toContain(">Chargement<");
	expect(html).not.toContain("h-screen");
});
