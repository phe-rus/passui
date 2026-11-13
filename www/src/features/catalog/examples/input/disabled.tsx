import { Input } from "@passui/react/input";

export function InputDisabled() {
	return (
		<Input
			disabled
			defaultValue="Locked"
			aria-label="Locked"
			className="max-w-sm"
		/>
	);
}
