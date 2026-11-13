import { BellIcon } from "@passui/icons/bell";
import { GlobeIcon } from "@passui/icons/globe";
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

export function ItemIconsAndImages() {
	return (
		<ItemGroup title="Preferences" className="w-full max-w-sm">
			<Item chevron render={<button type="button" />}>
				<ItemMedia>
					<BellIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Notifications</ItemTitle>
					<ItemDescription>Banners, sounds and badges.</ItemDescription>
				</ItemContent>
			</Item>
			<Item chevron render={<button type="button" />}>
				<ItemMedia>
					<LockIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Privacy</ItemTitle>
				</ItemContent>
				<ItemActions>On</ItemActions>
			</Item>
			<Item chevron render={<button type="button" />}>
				<ItemMedia>
					<GlobeIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Language</ItemTitle>
				</ItemContent>
				<ItemActions>English</ItemActions>
			</Item>
		</ItemGroup>
	);
}
