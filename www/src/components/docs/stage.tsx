import { cn } from "@passui/react/cn";
import type { ReactNode } from "react";

/**
 * The live preview surface. It is the page's own ground, `bg-background`, so an
 * example looks the way it will in an app. Passui has no wallpapers: an accent
 * may tint a ground (`bg-accent-soft`), but the standard one is the plain one.
 */
export function PreviewStage({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"bg-background text-label border-separator/60 relative flex min-h-56 items-center justify-center overflow-hidden rounded-3xl border p-8",
				className,
			)}
		>
			{children}
		</div>
	);
}
