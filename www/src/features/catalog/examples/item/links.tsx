import { Item, ItemContent, ItemGroup, ItemTitle } from "@passui/react/item";

const links = [
	{ href: "/docs/installation", label: "Installation" },
	{ href: "/docs/theming", label: "Theming" },
	{ href: "/docs/components", label: "All components" },
];

export function ItemLinks() {
	return (
		<ItemGroup title="Keep reading" className="w-full max-w-sm">
			{links.map((link) => (
				<Item key={link.href} chevron render={<a href={link.href} />}>
					<ItemContent>
						<ItemTitle>{link.label}</ItemTitle>
					</ItemContent>
				</Item>
			))}
		</ItemGroup>
	);
}
