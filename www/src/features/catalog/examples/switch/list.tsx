import { Switch } from "@passui/react/switch";

export function SwitchList() {
	return (
		<div className="flex flex-col gap-3">
			<Switch defaultChecked>Notifications</Switch>
			<Switch>Sounds</Switch>
			<Switch defaultChecked>Haptics</Switch>
		</div>
	);
}
