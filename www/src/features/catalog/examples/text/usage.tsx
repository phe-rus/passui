import { Text } from "@passui/react/text";

export function TextUsage() {
	return (
		<div className="flex flex-col gap-1">
			<Text as="h3" size="title3" weight="semibold">
				Passui
			</Text>
			<Text tone="secondary">
				Words in the type scale and the theme's roles.
			</Text>
		</div>
	);
}
