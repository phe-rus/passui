import { Textarea } from "@passui/react/textarea";

export function TextareaFloating() {
	return (
		<div className="w-full max-w-sm">
			<Textarea variant="floating" label="Notes" />
		</div>
	);
}
