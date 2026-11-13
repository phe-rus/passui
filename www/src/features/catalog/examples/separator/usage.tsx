import { Separator } from "@passui/react/separator";
import { Text } from "@passui/react/text";

export function SeparatorUsage() {
	return (
		<div className="w-full max-w-xs">
			<Text size="subheadline" weight="semibold">
				Passui
			</Text>
			<Text size="footnote" tone="secondary">
				Native React controls.
			</Text>
			<Separator className="my-3" />
			<Text size="footnote">Open source</Text>
		</div>
	);
}
