import { Switch } from "@passui/react/switch";

export function SwitchTones() {
	return (
		<div className="flex flex-col gap-3">
			<Switch tone="accent" defaultChecked>
				Accent, follows the chosen accent
			</Switch>
			<Switch tone="success" defaultChecked>
				Success, the iOS green
			</Switch>
		</div>
	);
}
