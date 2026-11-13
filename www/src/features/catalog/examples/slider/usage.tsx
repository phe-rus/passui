import { Slider } from "@passui/react/slider";

export function SliderUsage() {
	return (
		<div className="w-full max-w-sm">
			<Slider defaultValue={40} aria-label={["Volume"]} />
		</div>
	);
}
