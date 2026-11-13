import { Item, ItemContent, ItemGroup, ItemTitle } from "@passui/react/item";
import { toast } from "@passui/react/toast";

export function ItemPressable() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<ItemGroup title="Data">
				<Item
					chevron
					render={
						<button
							type="button"
							onClick={() => toast("Preparing your export")}
						/>
					}
				>
					<ItemContent>
						<ItemTitle>Export my data</ItemTitle>
					</ItemContent>
				</Item>
				<Item
					chevron
					render={
						<button type="button" onClick={() => toast("Cache cleared")} />
					}
				>
					<ItemContent>
						<ItemTitle>Clear cache</ItemTitle>
					</ItemContent>
				</Item>
			</ItemGroup>
			<ItemGroup footer="This can't be undone.">
				<Item render={<button type="button" />}>
					<ItemContent>
						<ItemTitle className="text-danger">Delete account</ItemTitle>
					</ItemContent>
				</Item>
			</ItemGroup>
		</div>
	);
}
