import { cn } from "@passui/react/cn";

/** The Passui mark: the sun in Blush. The brand colour stays fixed whatever accent the page wears. */
export function PassuiMark({
	className,
	animated,
}: {
	className?: string;
	animated?: boolean;
}) {
	return (
		<svg
			viewBox="0 0 32 32"
			aria-hidden="true"
			className={cn("size-7 shrink-0", className)}
		>
			<circle
				cx="16"
				cy="16"
				r="15"
				className={cn(
					"fill-accent [@media(prefers-color-scheme:dark)]:fill-[#e8b4bb]",
					animated &&
						"animate-[sunrise_1.4s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none",
				)}
			/>
		</svg>
	);
}
