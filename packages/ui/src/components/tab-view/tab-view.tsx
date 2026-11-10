import { useId, useRef, useState, type ReactNode } from "react"
import { cn } from "../../lib/class-names"

export type TabViewAlign = "start" | "center"
export type TabViewSize = "sm" | "md" | "lg"

const containerGaps: Record<TabViewSize, string> = {
    sm: "gap-4",
    md: "gap-5",
    lg: "gap-6",
}
const tablistClasses: Record<TabViewSize, string> = {
    sm: "inline-flex h-7 w-fit max-w-full items-center gap-4 p-[2px]",
    md: "inline-flex h-8 w-fit max-w-full items-center gap-5 p-[3px]",
    lg: "inline-flex h-10 w-fit max-w-full items-center gap-6 p-[4px]",
}
const tabText: Record<TabViewSize, string> = {
    sm: "text-footnote",
    md: "text-subheadline",
    lg: "text-body",
}
const underlineOffset: Record<TabViewSize, string> = {
    sm: "after:bottom-[-4px] after:h-0.5",
    md: "after:bottom-[-5px] after:h-0.5",
    lg: "after:bottom-[-6px] after:h-1",
}

export interface TabViewProps<Value extends string> {
    /** Available tabs, in keyboard navigation order. */
    options: readonly { value: Value; label: string; disabled?: boolean }[]
    /** Initial selection when value is not controlled. */
    defaultValue: Value
    /** Controlled selection; omit to keep selection inside TabView. */
    value?: Value
    onValueChange?: (value: Value) => void
    /** Tab alignment: `start` or `center`. @default "center" */
    align?: TabViewAlign
    /** Accessible name for the tab list. */
    label: string
    /** Renders the selected tab's panel. */
    children: (value: Value) => ReactNode
    /** Tablist height, tab text scale and underline offset. @default "md" */
    size?: TabViewSize
    className?: string
}

/** Content tabs with native buttons, roving focus and automatic keyboard activation. */
export function TabView<Value extends string>({
    options,
    defaultValue,
    value: controlledValue,
    onValueChange,
    align = "center",
    label,
    children,
    size = "md",
    className,
}: TabViewProps<Value>) {
    const id = useId()
    const buttons = useRef<(HTMLButtonElement | null)[]>([])
    const [selected, setSelected] = useState(defaultValue)
    const current = controlledValue ?? selected
    function select(next: Value) {
        if (controlledValue === undefined) setSelected(next)
        onValueChange?.(next)
    }
    const enabled = options.filter((option) => !option.disabled)
    const value = enabled.some((option) => option.value === current) ? current : enabled[0]?.value
    if (value === undefined) return null

    return (
        <div className={cn("flex w-full flex-col", containerGaps[size], className)}>
            <div
                role="tablist"
                aria-label={label}
                className={cn(
                    tablistClasses[size],
                    align === "start" ? "self-start" : "mx-auto justify-center"
                )}
            >
                {options.map((option, index) => (
                    <button
                        key={option.value}
                        type="button"
                        role="tab"
                        id={`${id}-tab-${index}`}
                        aria-controls={`${id}-panel-${index}`}
                        aria-selected={option.value === value}
                        aria-disabled={option.disabled || undefined}
                        disabled={option.disabled}
                        tabIndex={option.value === value ? 0 : -1}
                        ref={(element) => {
                            buttons.current[index] = element
                        }}
                        onClick={() => select(option.value)}
                        onKeyDown={(event) => {
                            const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
                            let next: number
                            let step: number
                            if (event.key === "Home") {
                                next = -1
                                step = 1
                            } else if (event.key === "End") {
                                next = options.length
                                step = -1
                            } else if (event.key === "ArrowRight") {
                                step = rtl ? -1 : 1
                                next = index
                            } else if (event.key === "ArrowLeft") {
                                step = rtl ? 1 : -1
                                next = index
                            } else return
                            event.preventDefault()
                            for (let offset = 0; offset < options.length; offset++) {
                                next = (next + step + options.length) % options.length
                                const option = options[next]
                                if (!option || option.disabled) continue
                                select(option.value)
                                buttons.current[next]?.focus()
                                break
                            }
                        }}
                        className={cn(
                            "relative inline-flex h-[calc(100%-1px)] shrink-0 items-center justify-center border border-transparent p-0 font-medium whitespace-nowrap",
                            tabText[size],
                            "focus-visible:outline-2 focus-visible:outline-offset-2",
                            "after:absolute after:inset-x-0 after:bg-current",
                            underlineOffset[size],
                            option.value === value
                                ? "after:opacity-100"
                                : "opacity-60 hover:opacity-100 after:opacity-0"
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            {options.map((option, index) => (
                <div
                    key={option.value}
                    role="tabpanel"
                    id={`${id}-panel-${index}`}
                    aria-labelledby={`${id}-tab-${index}`}
                    hidden={option.value !== value}
                    className="w-full outline-offset-4"
                >
                    {option.value === value && children(option.value)}
                </div>
            ))}
        </div>
    )
}
