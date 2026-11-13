import {
	Item,
	ItemActions,
	ItemContent,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";

const sizes = ["sm", "md", "lg"] as const;

export function ItemSizes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			{sizes.map((size) => (
				<ItemGroup key={size} size={size} title={`Size ${size}`}>
					<Item>
						<ItemContent>
							<ItemTitle>Storage</ItemTitle>
						</ItemContent>
						<ItemActions>12.4 GB of 50 GB</ItemActions>
					</Item>
					<Item>
						<ItemContent>
							<ItemTitle>Photo quality</ItemTitle>
						</ItemContent>
						<ItemActions>High</ItemActions>
					</Item>
				</ItemGroup>
			))}
		</div>
	);
}
