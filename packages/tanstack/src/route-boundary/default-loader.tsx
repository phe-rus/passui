import { LoadingIcon } from "@passui/react/icons";
import { cn } from "@passui/react/cn";

export type DefaultLoaderProps = {
	/** Translated loading status for assistive technology; never displayed visually. */
	label?: string;
	className?: string;
};

export function DefaultLoader({ label, className }: DefaultLoaderProps = {}) {
	return (
		<section
			role="status"
			aria-label={label}
			className={cn(
				"flex min-h-80 flex-1 items-center justify-center p-6",
				className,
			)}
		>
			<LoadingIcon
				aria-hidden="true"
				className="size-6! animate-spin motion-reduce:animate-none"
			/>
		</section>
	);
}
