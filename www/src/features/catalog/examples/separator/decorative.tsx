import { Separator } from "@passui/react/separator";
import { Text } from "@passui/react/text";

export function SeparatorDecorative() {
	return (
		<div className="flex w-full max-w-xs flex-col gap-3">
			<Text weight="semibold">Account</Text>
			<Separator />
			<Text weight="semibold">Billing</Text>
			<Separator />
			<Text weight="semibold">Security</Text>
		</div>
	);
}
