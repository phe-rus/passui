import { Field, FieldDescription, FieldLabel } from "@passui/react/field";
import { Switch } from "@passui/react/switch";

export function FieldHorizontal() {
	return (
		<Field orientation="horizontal" className="max-w-sm justify-between">
			<div>
				<FieldLabel>Notifications</FieldLabel>
				<FieldDescription>Daily summary by email.</FieldDescription>
			</div>
			<Switch aria-label="Notifications" />
		</Field>
	);
}
