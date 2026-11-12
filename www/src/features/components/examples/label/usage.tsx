import { Input } from "@passui/react/input";
import { Label } from "@passui/react/label";

export function LabelUsage() {
	return (
		<div className="flex max-w-sm flex-col gap-2">
			<Label htmlFor="city">City</Label>
			<Input id="city" />
		</div>
	);
}
