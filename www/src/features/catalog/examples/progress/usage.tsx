import { Progress } from "@passui/react/progress";

export function ProgressUsage() {
	return (
		<Progress value={64} aria-label="Upload progress" className="max-w-sm" />
	);
}
