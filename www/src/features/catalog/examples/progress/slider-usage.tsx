import { Slider } from "@passui/react/slider";

export function ProgressSliderUsage() {
	return (
		<Slider defaultValue={40} aria-label={["Volume"]} className="max-w-xs" />
	);
}
