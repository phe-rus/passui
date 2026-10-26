/** @jsxImportSource solid-js */
import { createEffect, Show } from "solid-js"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
export type ToggleStyle = "switch" | "checkbox"
export interface ToggleProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    disabled?: boolean
    style?: ToggleStyle
    mixed?: boolean
    labelHidden?: boolean
}
export function Toggle(props: ToggleProps) {
    let input: HTMLInputElement | undefined
    createEffect(() => {
        if (input) input.indeterminate = props.mixed ?? false
    })
    return (
        <Show
            when={props.style === "checkbox"}
            fallback={
                <button
                    type="button"
                    role="switch"
                    aria-checked={props.checked}
                    aria-label={props.label}
                    disabled={props.disabled}
                    onClick={() => {
                        haptic("selection")
                        props.onChange(!props.checked)
                    }}
                    class={cn(
                        "group/switch relative flex h-[30px] w-[50px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-normal",
                        "shadow-[inset_0_1px_2px_rgb(0_0_0/0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:opacity-45",
                        props.checked
                            ? "bg-accent ring-1 ring-accent-text"
                            : "bg-separator/80"
                    )}
                >
                    <span
                        class={cn(
                            "h-[26px] w-[26px] rounded-full bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.04),0_2px_4px_rgb(0_0_0/0.16),0_3px_8px_rgb(0_0_0/0.10)] transition-[width,transform] duration-fast motion-reduce:transition-none group-active/switch:w-[32px]",
                            props.checked
                                ? "translate-x-5 group-active/switch:translate-x-3.5"
                                : "translate-x-0"
                        )}
                    />
                </button>
            }
        >
            <label class="flex cursor-pointer items-center gap-3 text-subheadline">
                <input
                    ref={input}
                    type="checkbox"
                    aria-checked={
                        props.mixed ? "mixed" : props.checked
                    }
                    checked={props.checked}
                    disabled={props.disabled}
                    onChange={(event) =>
                        props.onChange(
                            event.currentTarget.checked
                        )
                    }
                    class="size-5 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text disabled:opacity-40"
                />
                <span
                    class={
                        props.labelHidden
                            ? "sr-only"
                            : undefined
                    }
                >
                    {props.label}
                </span>
            </label>
        </Show>
    )
}
