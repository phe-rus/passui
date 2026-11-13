import { Input } from "@passui/react/input";

export function InputSizes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Input size="sm" placeholder="Small" />
			<Input size="md" placeholder="Medium" />
			<Input size="lg" placeholder="Large" />
			<Input variant="floating" size="sm" label="Small, floating" />
			<Input variant="floating" size="lg" label="Large, floating" />
		</div>
	);
}
