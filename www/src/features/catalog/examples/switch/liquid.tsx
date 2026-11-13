import { Switch } from "@passui/react/switch";

export function SwitchLiquid() {
	return (
		<div className="flex flex-col gap-3">
			<Switch variant="liquid" size="lg" defaultChecked>
				Liquid
			</Switch>
			<Switch variant="liquid" size="md">
				Flip it and watch the drop chase the thumb
			</Switch>
		</div>
	);
}
