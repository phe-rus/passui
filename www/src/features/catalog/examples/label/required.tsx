import { Input } from "@passui/react/input";
import { Label } from "@passui/react/label";

export function LabelRequired() {
	return (
		<div className="flex max-w-sm flex-col gap-2">
			<Label htmlFor="email">Email (required)</Label>
			<Input id="email" type="email" required />
		</div>
	);
}
