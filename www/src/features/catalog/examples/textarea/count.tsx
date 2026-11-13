import { Textarea } from "@passui/react/textarea";

export function TextareaCount() {
	return (
		<div className="w-full max-w-sm">
			<Textarea
				showCount
				maxLength={140}
				placeholder="What is on your mind?"
				aria-label="Post"
			/>
		</div>
	);
}
