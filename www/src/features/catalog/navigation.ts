import { type guides, guidesIn } from "../docs/lib/get-guides";
import { getMeta, registry } from "./registry";
import type { ComponentMeta } from "./types";

export interface NavItem {
	title: string;
	href: string;
	/** "preview" red, "updated" yellow, "new" green. */
	status?: "new" | "updated" | "preview";
	/** Opens elsewhere (the repository), so it is a link, never a page. */
	external?: boolean;
}

export interface NavGroup {
	title: string;
	items: NavItem[];
}

const repository = "https://github.com/phe-rus/passui";

const byName = (a: ComponentMeta, b: ComponentMeta) =>
	a.name.localeCompare(b.name);

const guideItem = (g: (typeof guides)[number]): NavItem => ({
	title: g.title,
	href: g.path,
});

/**
 * The docs sidebar: the sections (introduction, the components page, setup,
 * theming, skills, changelog), every component alphabetically, the other
 * packages, hooks, and the namespace of references and repository links.
 */
export function getNavigation(): NavGroup[] {
	const sections = guidesIn("sections").map(guideItem);
	const [introduction, ...rest] = sections;
	return [
		{
			title: "Sections",
			items: [
				...(introduction ? [introduction] : []),
				{ title: "Components", href: "/docs/components" },
				...rest,
			],
		},
		{
			title: "Components",
			items: [...registry].sort(byName).map((c) => ({
				title: c.name,
				href: `/docs/components/${c.slug}`,
				status: c.preview ? ("preview" as const) : c.status,
			})),
		},
		{ title: "Libraries", items: guidesIn("libraries").map(guideItem) },
		{ title: "Hooks", items: guidesIn("hooks").map(guideItem) },
		{
			title: "Namespace",
			items: [
				...guidesIn("namespace").map(guideItem),
				{ title: "GitHub repository", href: repository, external: true },
				{
					title: "FAQ",
					href: `${repository}/discussions`,
					external: true,
				},
				{
					title: "Open bug",
					href: `${repository}/issues/new`,
					external: true,
				},
			],
		},
	].filter((group) => group.items.length > 0);
}

/** Every page in reading order, for previous and next links. */
export function getReadingOrder(): NavItem[] {
	return getNavigation()
		.flatMap((g) => g.items)
		.filter((i) => !i.external && i.href !== "/docs/components");
}

export function getNeighbours(href: string) {
	const order = getReadingOrder();
	const index = order.findIndex((i) => i.href === href);
	return {
		previous: index > 0 ? order[index - 1] : undefined,
		next: index >= 0 ? order[index + 1] : undefined,
	};
}

export { getMeta };
