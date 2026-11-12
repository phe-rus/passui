import { Textarea } from "@passui/react/textarea";

export function TextareaUsage() {
	return (
		<Textarea
			placeholder="Write a note"
			aria-label="Note"
			className="max-w-sm"
		/>
	);
}
