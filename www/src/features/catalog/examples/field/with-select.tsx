import { Field, FieldDescription, FieldLabel } from "@passui/react/field";
import { Select } from "@passui/react/select";

export function FieldWithSelect() {
	return (
		<Field className="max-w-sm">
			<FieldLabel>Plan</FieldLabel>
			<Select
				aria-label="Plan"
				defaultValue="pro"
				items={[
					{ value: "free", label: "Free" },
					{ value: "pro", label: "Pro" },
				]}
			/>
			<FieldDescription>You can change it later.</FieldDescription>
		</Field>
	);
}
