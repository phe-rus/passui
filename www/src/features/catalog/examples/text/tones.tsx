import { Text, type TextTone } from "@passui/react/text";

const tones: TextTone[] = [
	"default",
	"secondary",
	"tertiary",
	"accent",
	"success",
	"warning",
	"danger",
];

export function TextTones() {
	return (
		<div className="flex flex-col gap-1">
			{tones.map((tone) => (
				<Text key={tone} tone={tone} weight="medium">
					{tone}
				</Text>
			))}
		</div>
	);
}
