import { Textarea } from "@passui/react/textarea";

export function TextareaDisabled() {
	return (
		<Textarea
			disabled
			defaultValue="Read only for now."
			aria-label="Note"
			className="max-w-sm"
		/>
	);
}
