import { useEffect, useId, useRef, useState } from "react"
import { useDismiss } from "../../hooks/use-dismiss"
import { cn } from "../../lib/class-names"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListItem,
    SearchListEmpty,
} from "../search-list/search-list"

export interface ComboBoxOption<T extends string> {
    value: T
    label: string
    disabled?: boolean
    keywords?: string[]
}
export interface ComboBoxProps<T extends string> {
    value: T
    onChange: (value: NoInfer<T>) => void
    options: readonly ComboBoxOption<T>[]
    label: string
    emptyLabel: string
    placeholder?: string
    disabled?: boolean
    className?: string
}

/** Editable selection using the same keyboard and filtering engine as command search. */
export function ComboBox<T extends string>({
    value,
    onChange,
    options,
    label,
    emptyLabel,
    placeholder,
    disabled,
    className,
}: ComboBoxProps<T>) {
    const selected = options.find((option) => option.value === value)?.label ?? ""
    const [query, setQuery] = useState(selected)
    const [open, setOpen] = useState(false)
    const root = useRef<HTMLDivElement>(null)
    const input = useRef<HTMLInputElement>(null)
    const id = useId()
    useEffect(() => {
        setQuery(selected)
    }, [selected])
    const close = () => {
        setOpen(false)
        setQuery(selected)
    }
    useDismiss(root, open && !disabled, close)
    return (
        <div
            ref={root}
            className={cn("relative min-w-0", className)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) close()
            }}
        >
            <label
                htmlFor={id}
                className="mb-1.5 block text-footnote font-medium text-label-secondary"
            >
                {label}
            </label>
            <SearchList
                open={open && !disabled}
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.preventDefault()
                        event.stopPropagation()
                        close()
                    }
                    if (event.key === "ArrowDown" && !open && !disabled) {
                        event.preventDefault()
                        setOpen(true)
                    }
                }}
            >
                <SearchListField
                    ref={input}
                    id={id}
                    value={query}
                    onValueChange={(next) => {
                        setQuery(next)
                        setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-label={label}
                />
                <SearchListResults className="glass-menu absolute inset-x-0 top-full z-40 mt-1 max-h-64 rounded-xl p-1.5">
                    <SearchListEmpty className="px-3 py-2 text-footnote text-label-secondary">
                        {emptyLabel}
                    </SearchListEmpty>
                    {options.map((option) => (
                        <SearchListItem
                            key={option.value}
                            value={option.label}
                            keywords={option.keywords}
                            disabled={option.disabled}
                            onSelect={() => {
                                onChange(option.value)
                                setQuery(option.label)
                                setOpen(false)
                                input.current?.focus({ preventScroll: true })
                            }}
                        >
                            {option.label}
                        </SearchListItem>
                    ))}
                </SearchListResults>
            </SearchList>
        </div>
    )
}
