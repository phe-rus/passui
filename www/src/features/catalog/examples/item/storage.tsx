import { Badge } from "@passui/react/badge";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";
import { Progress } from "@passui/react/progress";

export function ItemStorage() {
	return (
		<ItemGroup
			title="Storage"
			footer="Backups run at night while charging."
			className="w-full max-w-sm"
		>
			<Item>
				<ItemContent className="gap-2">
					<span className="flex items-baseline justify-between gap-3">
						<ItemTitle>Used</ItemTitle>
						<ItemDescription className="shrink-0">
							12.4 GB of 50 GB
						</ItemDescription>
					</span>
					<Progress value={25} aria-label="Storage used" />
				</ItemContent>
			</Item>
			<Item>
				<ItemContent>
					<ItemTitle>Back up automatically</ItemTitle>
					<ItemDescription>Photos, notes and settings.</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Badge variant="success">On</Badge>
				</ItemActions>
			</Item>
		</ItemGroup>
	);
}
