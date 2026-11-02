import type { ReactNode } from "react"
import { cn } from "../../lib/class-names"

export interface BreadcrumbItem {
    label: string
    href?: string
}
export interface BreadcrumbProps {
    label: string
    items: readonly BreadcrumbItem[]
    className?: string
    /** Integrate a client router without nesting interactive elements. */
    renderLink?: (item: BreadcrumbItem & { href: string }) => ReactNode
}
/** Ancestors stay links; the final item identifies the current page. */
export function Breadcrumb({ label, items, className, renderLink }: BreadcrumbProps) {
    return (
        <nav aria-label={label} className={className}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-footnote text-label-secondary">
                {items.map((item, index) => (
                    <li key={`${index}-${item.label}`} className="flex min-w-0 items-center gap-2">
                        {index > 0 && (
                            <span aria-hidden="true" className="text-label-tertiary">
                                /
                            </span>
                        )}
                        {index === items.length - 1 ? (
                            <span aria-current="page" className="font-medium text-label">
                                {item.label}
                            </span>
                        ) : item.href ? (
                            (renderLink?.({ ...item, href: item.href }) ?? (
                                <a
                                    href={item.href}
                                    className={cn(
                                        "rounded-sm hover:text-label focus-visible:outline-2 focus-visible:outline-accent-text"
                                    )}
                                >
                                    {item.label}
                                </a>
                            ))
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
