import { Input } from "@passui/react/input";
import { Label } from "@passui/react/label";

export function LabelNested() {
	return (
		<Label className="flex w-64 flex-col items-start gap-1.5">
			Email
			<Input type="email" placeholder="you@example.com" />
		</Label>
	);
}
