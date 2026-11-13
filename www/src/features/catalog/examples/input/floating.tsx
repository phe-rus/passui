import { Input } from "@passui/react/input";

export function InputFloating() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Input variant="floating" label="Email" type="email" />
			<Input variant="floating" label="Display name" defaultValue="Ada" />
			<Input variant="floating" label="Password" type="password" aria-invalid />
		</div>
	);
}
