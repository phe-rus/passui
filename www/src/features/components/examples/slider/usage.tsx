import { Slider } from "@passui/react/slider";

export function SliderUsage() {
	return (
		<Slider defaultValue={40} aria-label={["Volume"]} className="max-w-xs" />
	);
}
