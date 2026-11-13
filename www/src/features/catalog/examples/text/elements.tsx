import { Text } from "@passui/react/text";

export function TextElements() {
	return (
		<div className="flex max-w-sm flex-col gap-2">
			<Text as="h2" size="title2" weight="bold">
				A heading
			</Text>
			<Text tone="secondary">
				The style and the element are separate: this is a paragraph with a{" "}
				<Text as="span" tone="accent" weight="semibold">
					span
				</Text>{" "}
				inside it.
			</Text>
			<Text truncate tone="tertiary" size="footnote">
				One line only, cut with an ellipsis when it does not fit the space it is
				given.
			</Text>
		</div>
	);
}
