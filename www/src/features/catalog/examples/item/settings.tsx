import { BellIcon } from "@passui/icons/bell";
import { MoonIcon } from "@passui/icons/moon";
import { Avatar, AvatarFallback, AvatarImage } from "@passui/react/avatar";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@passui/react/item";
import { Switch } from "@passui/react/switch";

export function ItemSettings() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<ItemGroup>
				<Item chevron render={<button type="button" />}>
					<ItemMedia variant="image">
						<Avatar className="size-full">
							<AvatarImage src="/avatars/aiko.svg" alt="" />
							<AvatarFallback>AK</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Aiko Kamado</ItemTitle>
						<ItemDescription>Account, security and billing</ItemDescription>
					</ItemContent>
				</Item>
			</ItemGroup>
			<ItemGroup title="Appearance">
				<Item>
					<ItemMedia>
						<MoonIcon />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Dark mode</ItemTitle>
					</ItemContent>
					<ItemActions>
						<Switch aria-label="Dark mode" />
					</ItemActions>
				</Item>
				<Item>
					<ItemMedia>
						<BellIcon />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Notifications</ItemTitle>
						<ItemDescription>Banners and sounds</ItemDescription>
					</ItemContent>
					<ItemActions>
						<Switch defaultChecked aria-label="Notifications" />
					</ItemActions>
				</Item>
			</ItemGroup>
		</div>
	);
}
