import { AspectRatio } from "@passui/react/aspect-ratio";
export function AspectRatioSquare() {
	return (
		<AspectRatio ratio={1} className="bg-fill max-w-xs rounded-3xl">
			<div className="text-subheadline text-label-secondary absolute inset-0 grid place-items-center">
				1
			</div>
		</AspectRatio>
	);
}
