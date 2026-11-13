import { Progress } from "@passui/react/progress";

export function ProgressSloshSizes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Progress variant="slosh" size="sm" label="Small" defaultValue={35} />
			<Progress variant="slosh" size="md" label="Medium" defaultValue={55} />
			<Progress variant="slosh" size="lg" label="Large" defaultValue={75} />
		</div>
	);
}
