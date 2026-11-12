import { cn } from "@passui/react/cn";
import { Spinner } from "@passui/react/spinner";

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
			<Spinner className="size-6" role="presentation" aria-hidden="true" />
		</section>
	);
}
