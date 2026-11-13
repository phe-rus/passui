import { Progress } from "@passui/react/progress";

export function ProgressSlosh() {
	return (
		<div className="w-full max-w-sm">
			<Progress variant="slosh" label="Brightness" defaultValue={62} />
		</div>
	);
}
