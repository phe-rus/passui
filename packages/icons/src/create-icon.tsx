import { forwardRef, type SVGProps } from "react";

export type IconTone = "mono" | "duo";
export type IconAnimation = "spin" | "pulse" | "draw";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
	/** Width and height. Numbers are pixels. @default 24 */
	size?: number | string;
	/** `mono` draws one colour. `duo` softens the detail through `--icon-secondary`. @default "mono" */
	tone?: IconTone;
	/** Plays an animation from `@passui/icons/styles.css`. Off under reduced motion. */
	animate?: IconAnimation;
	/** Accessible name. Without one the icon is hidden from assistive technology. */
	title?: string;
}

/** Builds an icon from its two drawing layers. */
export function createIcon(
	displayName: string,
	primary: string,
	secondary: string,
) {
	const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
		{ size = 24, tone = "mono", animate, title, ...props },
		ref,
	) {
		return (
			<svg
				ref={ref}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width={size}
				height={size}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				role={title ? "img" : undefined}
				aria-label={title}
				aria-hidden={title ? undefined : true}
				data-icon-tone={tone}
				data-icon-animate={animate}
				{...props}
			>
				<path data-part="primary" d={primary} pathLength={1} />
				{secondary ? (
					<path
						data-part="secondary"
						d={secondary}
						pathLength={1}
						strokeOpacity={
							tone === "duo" ? "var(--icon-secondary, 0.4)" : undefined
						}
					/>
				) : null}
			</svg>
		);
	});
	Icon.displayName = displayName;
	return Icon;
}
