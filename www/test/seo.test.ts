import { expect, it } from "vitest";
import { getLlmsTxt, getSkill } from "../src/features/ai/ai-context";
import { registry } from "../src/features/catalog/registry";
import { getPageHead } from "../src/features/seo/lib/seo";
import { pageUrl } from "../src/features/seo/lib/site";
import {
	getRobots,
	getSitemap,
	getSitemapPaths,
} from "../src/features/seo/lib/sitemap";

it("canonical urls drop query strings, fragments and trailing slashes", () => {
	expect(pageUrl("/docs/components/button/?x=1#top")).toBe(
		"https://passui.pherus.org/docs/components/button",
	);
	expect(pageUrl("/")).toBe("https://passui.pherus.org/");
});

it("the sitemap lists every guide and component once and nothing else", () => {
	const paths = getSitemapPaths();
	expect(new Set(paths).size).toBe(paths.length);
	for (const c of registry)
		expect(paths).toContain(`/docs/components/${c.slug}`);
	expect(getSitemap()).not.toContain("preview");
	expect(getRobots()).toContain(
		"Sitemap: https://passui.pherus.org/sitemap.xml",
	);
});

it("page head carries one canonical, social cards and escaped structured data", () => {
	const head = getPageHead(
		"/docs/components/button",
		"Button · Passui",
		"A button </script>",
	);
	expect(head.links).toEqual([
		{
			rel: "canonical",
			href: "https://passui.pherus.org/docs/components/button",
		},
	]);
	const json = head.scripts[0]?.children ?? "";
	expect(json).not.toContain("</script>");
	expect(JSON.parse(json)["@graph"]).toHaveLength(3);
});

it("llms.txt and the skill name every component's import path", () => {
	for (const c of registry) {
		expect(getLlmsTxt()).toContain(`@passui/react/${c.entry}`);
		expect(getSkill()).toContain(`@passui/react/${c.entry}`);
	}
});
