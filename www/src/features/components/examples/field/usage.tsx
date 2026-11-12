import { Field, FieldDescription, FieldLabel } from "@passui/react/field";
import { Input } from "@passui/react/input";

export function FieldUsage() {
	return (
		<Field className="max-w-sm">
			<FieldLabel htmlFor="email">Email</FieldLabel>
			<Input id="email" type="email" placeholder="you@example.com" />
			<FieldDescription>We only use it to sign you in.</FieldDescription>
		</Field>
	);
}
