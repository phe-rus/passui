import { Progress } from "@passui/react/progress";

export function ProgressWakeSizes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Progress variant="wake" size="sm" label="Small" defaultValue={30} />
			<Progress variant="wake" size="md" label="Medium" defaultValue={50} />
			<Progress variant="wake" size="lg" label="Large" defaultValue={70} />
		</div>
	);
}
