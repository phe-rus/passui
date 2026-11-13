import { Label } from "@passui/react/label";
import { Text } from "@passui/react/text";
import { Textarea } from "@passui/react/textarea";

export function TextareaRows() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-1.5">
			<Label htmlFor="bio">Bio</Label>
			<Textarea id="bio" placeholder="A few words about you" />
			<Text size="footnote" tone="secondary">
				Shown on your profile.
			</Text>
		</div>
	);
}
