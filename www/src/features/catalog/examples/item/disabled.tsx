import { LockIcon } from "@passui/icons/lock";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@passui/react/item";

export function ItemDisabled() {
	return (
		<ItemGroup title="Security" className="w-full max-w-sm">
			<Item chevron render={<button type="button" />}>
				<ItemMedia>
					<LockIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Change password</ItemTitle>
				</ItemContent>
			</Item>
			<Item chevron render={<button type="button" disabled />}>
				<ItemMedia>
					<LockIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Manage passkeys</ItemTitle>
					<ItemDescription>Available on the Team plan.</ItemDescription>
				</ItemContent>
				<ItemActions>Team</ItemActions>
			</Item>
		</ItemGroup>
	);
}
