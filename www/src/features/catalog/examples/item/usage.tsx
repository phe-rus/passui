import {
	Item,
	ItemActions,
	ItemContent,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";

export function ItemUsage() {
	return (
		<ItemGroup
			title="Account"
			footer="Your name appears on shared notes."
			className="w-full max-w-sm"
		>
			<Item>
				<ItemContent>
					<ItemTitle>Name</ItemTitle>
				</ItemContent>
				<ItemActions>Aiko Kamado</ItemActions>
			</Item>
			<Item>
				<ItemContent>
					<ItemTitle>Email</ItemTitle>
				</ItemContent>
				<ItemActions>aiko@example.com</ItemActions>
			</Item>
		</ItemGroup>
	);
}
