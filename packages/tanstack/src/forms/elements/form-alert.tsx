import { WarningIcon } from "@passui/icons/warning";
import { cn } from "@passui/react/cn";
import type { ReactNode } from "react";

/** A form-level error people can't miss: announced, tinted, and gently shaken in. */
export function FormAlert({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			role="alert"
			className={cn(
				"bg-danger/12 text-subheadline text-danger ring-danger/25 flex items-start gap-2.5 rounded-2xl px-4 py-3 font-medium ring-1 ring-inset",
				"motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-300",
				className,
			)}
		>
			<WarningIcon size={16} className="mt-px shrink-0" />
			<span className="min-w-0">{children}</span>
		</div>
	);
}
