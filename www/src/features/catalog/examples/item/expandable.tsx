import { Field, FieldDescription, FieldLabel } from "@passui/react/field";
import { Input } from "@passui/react/input";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";
import { Select } from "@passui/react/select";
import { Switch } from "@passui/react/switch";
import { useState } from "react";

export function ItemExpandable() {
	const [name, setName] = useState("Aiko Kamado");

	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<ItemGroup title="Profile">
				<Item
					defaultOpen
					panel={
						<>
							<Field>
								<FieldLabel htmlFor="item-name">Display name</FieldLabel>
								<Input
									id="item-name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="item-email">Email</FieldLabel>
								<Input
									id="item-email"
									type="email"
									placeholder="you@example.com"
								/>
								<FieldDescription>
									We only use it to sign you in.
								</FieldDescription>
							</Field>
						</>
					}
				>
					<ItemContent>
						<ItemTitle>Name and email</ItemTitle>
						<ItemDescription>{name}</ItemDescription>
					</ItemContent>
				</Item>
				<Item
					panel={
						<>
							<Select
								aria-label="Language"
								placeholder="Choose a language"
								items={[
									{ value: "en", label: "English" },
									{ value: "ja", label: "日本語" },
									{ value: "fr", label: "Français" },
								]}
							/>
						</>
					}
				>
					<ItemContent>
						<ItemTitle>Region</ItemTitle>
					</ItemContent>
				</Item>
			</ItemGroup>
			<ItemGroup
				title="Notifications"
				footer="Quiet hours always silence banners and sounds."
			>
				<Item
					panel={
						<>
							<span className="flex items-center justify-between gap-3">
								<span className="text-subheadline">Banners</span>
								<Switch defaultChecked aria-label="Banners" />
							</span>
							<span className="flex items-center justify-between gap-3">
								<span className="text-subheadline">Sounds</span>
								<Switch aria-label="Sounds" />
							</span>
						</>
					}
				>
					<ItemContent>
						<ItemTitle>Alerts</ItemTitle>
					</ItemContent>
					<ItemActions>2 kinds</ItemActions>
				</Item>
			</ItemGroup>
		</div>
	);
}
