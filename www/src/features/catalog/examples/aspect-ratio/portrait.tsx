import { AspectRatio } from "@passui/react/aspect-ratio";
export function AspectRatioPortrait() {
	return (
		<AspectRatio ratio={3 / 4} className="bg-fill max-w-xs rounded-3xl">
			<div className="text-subheadline text-label-secondary absolute inset-0 grid place-items-center">
				3 / 4
			</div>
		</AspectRatio>
	);
}
