import { guides } from "../guides/guides";
import { getMeta, registry } from "./registry";
import type { ComponentMeta } from "./types";

export interface NavItem {
	title: string;
	href: string;
	preview?: boolean;
}

export interface NavGroup {
	title: string;
	items: NavItem[];
}

const byName = (a: ComponentMeta, b: ComponentMeta) =>
	a.name.localeCompare(b.name);

/** The docs sidebar: guides first, then every component in one alphabetical category. */
export function getNavigation(): NavGroup[] {
	return [
		{
			title: "Getting started",
			items: guides.map((g) => ({ title: g.title, href: g.path })),
		},
		{
			title: "Components",
			items: [
				{ title: "Overview", href: "/docs/components" },
				...[...registry].sort(byName).map((c) => ({
					title: c.name,
					href: `/docs/components/${c.slug}`,
					preview: c.preview,
				})),
			],
		},
	];
}

/** Every page in reading order, for previous and next links. */
export function getReadingOrder(): NavItem[] {
	return getNavigation()
		.flatMap((g) => g.items)
		.filter((i) => i.href !== "/docs/components");
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
