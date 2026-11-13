import { Switch } from "@passui/react/switch";

export function SwitchDisabled() {
	return (
		<div className="flex flex-col gap-3">
			<Switch disabled>Off and locked</Switch>
			<Switch disabled defaultChecked>
				On and locked
			</Switch>
		</div>
	);
}
