import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";

export function ItemLongText() {
	return (
		<ItemGroup title="Long content" className="w-full max-w-xs">
			<Item>
				<ItemContent>
					<ItemTitle>
						A title far too long to fit on a single narrow line
					</ItemTitle>
					<ItemDescription>
						Descriptions wrap onto a second line and then clamp, so one verbose
						row never pushes the rest of the group around, however much text an
						app hands it.
					</ItemDescription>
				</ItemContent>
				<ItemActions>12</ItemActions>
			</Item>
			<Item>
				<ItemContent>
					<ItemTitle>Short</ItemTitle>
				</ItemContent>
				<ItemActions>A value that stays whole</ItemActions>
			</Item>
		</ItemGroup>
	);
}
