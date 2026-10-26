import {
    useId,
    useRef,
    useState,
    type ReactNode,
} from "react"
import { cn } from "../../lib/class-names"

/** Content tabs with native buttons, roving focus and automatic keyboard activation. */
export function TabView<Value extends string>({
    options,
    defaultValue,
    value: controlledValue,
    onValueChange,
    align = "center",
    label,
    children,
    className,
}: {
    options: readonly { value: Value; label: string }[]
    defaultValue: Value
    value?: Value
    onValueChange?: (value: Value) => void
    align?: "start" | "center"
    label: string
    children: (value: Value) => ReactNode
    className?: string
}) {
    const id = useId()
    const buttons = useRef<(HTMLButtonElement | null)[]>([])
    const [selected, setSelected] = useState(defaultValue)
    const current = controlledValue ?? selected
    function select(next: Value) {
        if (controlledValue === undefined) setSelected(next)
        onValueChange?.(next)
    }
    const value = options.some(
        (option) => option.value === current
    )
        ? current
        : options[0]?.value
    if (value === undefined) return null

    return (
        <div
            className={cn(
                "flex w-full flex-col gap-5",
                className
            )}
        >
            <div
                role="tablist"
                aria-label={label}
                className={cn(
                    "inline-flex h-8 w-fit max-w-full items-center gap-5 p-[3px]",
                    align === "start"
                        ? "self-start"
                        : "mx-auto justify-center"
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
                        tabIndex={
                            option.value === value ? 0 : -1
                        }
                        ref={(element) => {
                            buttons.current[index] = element
                        }}
                        onClick={() => select(option.value)}
                        onKeyDown={(event) => {
                            const rtl =
                                getComputedStyle(
                                    event.currentTarget
                                ).direction === "rtl"
                            let next: number
                            if (event.key === "Home") next = 0
                            else if (event.key === "End")
                                next = options.length - 1
                            else if (
                                event.key === "ArrowRight"
                            )
                                next = index + (rtl ? -1 : 1)
                            else if (
                                event.key === "ArrowLeft"
                            )
                                next = index + (rtl ? 1 : -1)
                            else return
                            event.preventDefault()
                            next =
                                (next + options.length) %
                                options.length
                            const option = options[next]
                            if (option) select(option.value)
                            buttons.current[next]?.focus()
                        }}
                        className={cn(
                            "relative inline-flex h-[calc(100%-1px)] shrink-0 items-center justify-center border border-transparent p-0 text-sm font-medium whitespace-nowrap",
                            "focus-visible:outline-2 focus-visible:outline-offset-2",
                            "after:absolute after:inset-x-0 after:bottom-[-5px] after:h-0.5 after:bg-current",
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
                    {option.value === value &&
                        children(option.value)}
                </div>
            ))}
        </div>
    )
}
