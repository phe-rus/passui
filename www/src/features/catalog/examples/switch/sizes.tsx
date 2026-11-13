import { Switch } from "@passui/react/switch";

export function SwitchSizes() {
	return (
		<div className="flex flex-col gap-3">
			<Switch size="sm" defaultChecked>
				Small
			</Switch>
			<Switch size="md" defaultChecked>
				Medium
			</Switch>
			<Switch size="lg" defaultChecked>
				Large
			</Switch>
		</div>
	);
}
