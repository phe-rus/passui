import { Input } from "@passui/react/input";
import { Label } from "@passui/react/label";
import { Text } from "@passui/react/text";

export function InputField() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-1.5">
			<Label htmlFor="handle">Handle</Label>
			<Input id="handle" placeholder="mira" />
			<Text size="footnote" tone="secondary">
				Letters and numbers only.
			</Text>
		</div>
	);
}
