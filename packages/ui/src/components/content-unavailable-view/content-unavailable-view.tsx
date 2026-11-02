import type { ReactNode, ComponentProps } from "react"
import { cn } from "../../lib/class-names"

export interface ContentUnavailableViewProps extends Omit<ComponentProps<"div">, "title"> {
    title: string
    description?: string
    icon?: ReactNode
    actions?: ReactNode
}

/** A focused empty or unavailable state with an optional next action. */
export function ContentUnavailableView({
    title,
    description,
    icon,
    actions,
    className,
    ...props
}: ContentUnavailableViewProps) {
    return (
        <div
            {...props}
            className={cn("flex flex-col items-center gap-3 px-6 py-10 text-center", className)}
        >
            {icon && (
                <span aria-hidden="true" className="text-label-tertiary">
                    {icon}
                </span>
            )}
            <p className="text-headline font-semibold text-label">{title}</p>
            {description && (
                <p className="max-w-sm text-footnote text-label-secondary">{description}</p>
            )}
            {actions && <div className="mt-1 flex flex-wrap justify-center gap-2">{actions}</div>}
        </div>
    )
}
