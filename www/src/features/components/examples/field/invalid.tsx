import { Field, FieldError, FieldLabel } from "@passui/react/field";
import { Input } from "@passui/react/input";

export function FieldInvalid() {
	return (
		<Field invalid className="max-w-sm">
			<FieldLabel htmlFor="name">Name</FieldLabel>
			<Input id="name" aria-invalid defaultValue="" />
			<FieldError>Enter a name.</FieldError>
		</Field>
	);
}
