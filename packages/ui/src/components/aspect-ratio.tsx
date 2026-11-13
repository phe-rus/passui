import type { HTMLAttributes } from "react";
import { cx } from "../lib/cx";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
	/** Width divided by height. @default 1.3333333333333333 */
	ratio?: number;
}

/** A crop frame: size its geometry, while images cover without distortion. */
export function AspectRatio({
	ratio = 4 / 3,
	className,
	style,
	...props
}: AspectRatioProps) {
	const aspect = Number.isFinite(ratio) && ratio > 0 ? ratio : 4 / 3;
	return (
		<div
			data-slot="aspect-ratio"
			{...props}
			className={cx(
				"relative w-full overflow-hidden [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover",
				className,
			)}
			style={{ aspectRatio: aspect, ...style }}
		/>
	);
}
