/** @jsxImportSource solid-js */
import { mergeProps, splitProps, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
export interface SearchFieldProps
    extends JSX.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}
export function SearchField(props: SearchFieldProps) {
    const [local, rest] = splitProps(
        mergeProps({ placeholder: "Search" }, props),
        ["class", "className", "placeholder"]
    )
    return (
        <label
            class={cn(
                "control-field flex items-center gap-2 rounded-lg px-2.5 py-2 text-subheadline text-label-tertiary",
                local.class,
                local.className
            )}
        >
            <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <circle cx="10.5" cy="10.5" r="7" />
                <path d="m16 16 5 5" />
            </svg>
            <input
                {...rest}
                type="search"
                placeholder={local.placeholder}
                class="min-w-0 grow bg-transparent text-label outline-none placeholder:text-label-tertiary"
            />
        </label>
    )
}
