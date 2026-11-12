import { AspectRatio } from "@passui/react/aspect-ratio";
export function AspectRatioUsage() {
	return (
		<AspectRatio ratio={4 / 3} className="bg-fill max-w-xs rounded-3xl">
			<div className="text-subheadline text-label-secondary absolute inset-0 grid place-items-center">
				4 / 3
			</div>
		</AspectRatio>
	);
}
