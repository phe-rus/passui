import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";
import { Switch } from "@passui/react/switch";

export function ItemGroups() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<ItemGroup title="Sign in">
				<Item>
					<ItemContent>
						<ItemTitle>Passkeys</ItemTitle>
					</ItemContent>
					<ItemActions>
						<Switch defaultChecked aria-label="Passkeys" />
					</ItemActions>
				</Item>
				<Item>
					<ItemContent>
						<ItemTitle>Two-step verification</ItemTitle>
					</ItemContent>
					<ItemActions>
						<Switch defaultChecked aria-label="Two-step verification" />
					</ItemActions>
				</Item>
			</ItemGroup>
			<ItemGroup
				title="Recovery"
				footer="Used only if you lose access to every device."
			>
				<Item>
					<ItemContent>
						<ItemTitle>Recovery email</ItemTitle>
						<ItemDescription>Where we send the reset link.</ItemDescription>
					</ItemContent>
					<ItemActions>a•••@example.com</ItemActions>
				</Item>
			</ItemGroup>
		</div>
	);
}
