import { Slider } from "@passui/react/slider";

export function SliderRange() {
	return (
		<Slider
			defaultValue={[20, 70]}
			aria-label={["Minimum", "Maximum"]}
			className="max-w-xs"
		/>
	);
}
