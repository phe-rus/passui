import { Button } from "../button/button";
import { type ReactNode, useId } from "react";
import { ChevronDownIcon } from "../../icons/icons";
import { cn } from "../../lib/class-names";
import { InlineDisclosure } from "../inline-disclosure/inline-disclosure";

export type DisclosureGroupSize = "sm" | "md" | "lg";

const triggerSizes: Record<DisclosureGroupSize, string> = {
	sm: "h-auto min-h-9 w-full rounded-lg px-3 py-2 text-start text-footnote active:scale-100",
	md: "h-auto min-h-11 w-full rounded-xl px-4 py-3 text-start text-subheadline active:scale-100",
	lg: "h-auto min-h-13 w-full rounded-2xl px-5 py-4 text-start text-body active:scale-100",
};
const descriptionSizes: Record<DisclosureGroupSize, string> = {
	sm: "text-caption2 leading-caption2 font-normal break-words whitespace-normal text-label-secondary",
	md: "text-footnote leading-footnote font-normal break-words whitespace-normal text-label-secondary",
	lg: "text-subheadline leading-subheadline font-normal break-words whitespace-normal text-label-secondary",
};
const contentSizes: Record<DisclosureGroupSize, string> = {
	sm: "min-w-0 px-3 pb-3 text-footnote leading-footnote text-label-secondary [overflow-wrap:anywhere]",
	md: "min-w-0 px-4 pb-4 text-subheadline leading-subheadline text-label-secondary [overflow-wrap:anywhere]",
	lg: "min-w-0 px-5 pb-5 text-body leading-body text-label-secondary [overflow-wrap:anywhere]",
};
const chevronSizes: Record<DisclosureGroupSize, number> = {
	sm: 15,
	md: 17,
	lg: 19,
};

export interface DisclosureGroupProps {
	label: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	disabled?: boolean;
	className?: string;
	/** Trigger layout when composed inside a shared surface such as Accordion. */
	triggerClassName?: string;
	/** Supporting text beneath the title. */
	description?: string;
	/** Trigger, description and content density. @default "md" */
	size?: DisclosureGroupSize;
}

/** A controlled, accessible disclosure row with the shared inline reveal. */
export function DisclosureGroup({
	label,
	open,
	onOpenChange,
	children,
	disabled = false,
	className,
	triggerClassName,
	description,
	size = "md",
}: DisclosureGroupProps) {
	const id = useId();

	return (
		<div className={cn("w-full min-w-0", className)}>
			<h3 className="m-0">
				<Button
					variant="ghost"
					contentClassName="w-full min-w-0 justify-between gap-3"
					type="button"
					id={`${id}-trigger`}
					aria-expanded={open}
					aria-controls={id}
					disabled={disabled}
					onClick={() => onOpenChange(!open)}
					className={cn(
						triggerSizes[size],
						"text-label hover:bg-fill/60 font-normal focus-visible:ring-offset-0 focus-visible:ring-inset",
						"focus-visible:outline-accent-text disabled:cursor-not-allowed disabled:opacity-40",
						triggerClassName,
					)}
				>
					<span className="flex min-w-0 flex-col gap-0.5">
						<span className="font-medium break-words whitespace-normal">
							{label}
						</span>
						{description && (
							<span className={descriptionSizes[size]}>{description}</span>
						)}
					</span>
					<ChevronDownIcon
						size={chevronSizes[size]}
						aria-hidden="true"
						className={cn(
							"text-label-tertiary duration-normal shrink-0 transition-transform motion-reduce:transition-none",
							open && "rotate-180",
						)}
					/>
				</Button>
			</h3>
			<section
				id={id}
				aria-labelledby={`${id}-trigger`}
				aria-hidden={!open}
				inert={!open}
			>
				<InlineDisclosure open={open}>
					<div className={contentSizes[size]}>{children}</div>
				</InlineDisclosure>
			</section>
		</div>
	);
}
