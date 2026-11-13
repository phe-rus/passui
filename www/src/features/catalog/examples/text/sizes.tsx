import { Text, type TextSize } from "@passui/react/text";

const sizes: TextSize[] = [
	"caption2",
	"caption",
	"footnote",
	"subheadline",
	"callout",
	"body",
	"headline",
	"title3",
	"title2",
	"title",
];

export function TextSizes() {
	return (
		<div className="flex flex-col gap-1">
			{sizes.map((size) => (
				<Text key={size} size={size}>
					{size}
				</Text>
			))}
		</div>
	);
}
