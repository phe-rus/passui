import { Input } from "@passui/react/input";

export function InputTypes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Input type="file" aria-label="Upload" />
			<Input disabled placeholder="Disabled" aria-label="Disabled" />
			<Input aria-invalid defaultValue="not an email" aria-label="Email" />
		</div>
	);
}
