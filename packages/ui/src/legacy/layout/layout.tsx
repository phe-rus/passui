import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "../../lib/class-names";

type LayoutProps = PropsWithChildren<{
	heading: ReactNode;
	className?: string;
}>;

type HeadingProps = {
	/** The page title. Any node. */
	title: ReactNode;
	/** Sits directly under the title with no gap. Any node. */
	description?: ReactNode;
	/** Trailing control beside the title, such as a button or badge. */
	action?: ReactNode;
	size?: keyof typeof titleSizes;
};

const titleSizes = {
	default: "text-large-title leading-large-title",
	// sign in style screens: centered, tighter, like a system sheet
	compact: "text-title leading-title font-semibold tracking-tight",
} as const;

export function Layout({ heading, className, children }: LayoutProps) {
	return (
		<article
			className={cn(
				"container mx-auto flex flex-col",
				"w-full gap-0 py-12 md:max-w-3xl",
				className,
			)}
		>
			{heading}
			<div className="mt-8 flex flex-col gap-6">{children}</div>
		</article>
	);
}

function Heading({
	title,
	description,
	action,
	size = "default",
}: HeadingProps) {
	const centered = size === "compact";
	return (
		<header
			data-slot="layout-heading"
			className={cn(
				"flex flex-col gap-0",
				centered && "items-center text-center",
			)}
		>
			<div
				className={cn(
					"flex flex-wrap items-center gap-3",
					centered && "justify-center",
				)}
			>
				<h1 className={cn("m-0 min-w-0 wrap-anywhere", titleSizes[size])}>
					{title}
				</h1>
				{action}
			</div>
			{description ? (
				<div
					className={cn(
						"text-subheadline text-label-secondary m-0 max-w-prose leading-snug",
						centered && "text-center",
					)}
				>
					{description}
				</div>
			) : null}
		</header>
	);
}

Layout.Heading = Heading;
