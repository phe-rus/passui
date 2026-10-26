/** @jsxImportSource solid-js */
import { createUniqueId, For, Show } from "solid-js"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
export interface SwatchPickerProps<T extends string> {
    value: T
    options: {
        value: T
        label: string
        color: string
        ink: string
    }[]
    onChange: (value: T) => void
    label: string
}
export function SwatchPicker<T extends string>(
    props: SwatchPickerProps<T>
) {
    const name = createUniqueId()
    return (
        <fieldset class="flex flex-wrap gap-3">
            <legend class="sr-only">{props.label}</legend>
            <For each={props.options}>
                {(option) => {
                    const selected = () =>
                        option.value === props.value
                    return (
                        <label class="group flex cursor-pointer flex-col items-center gap-1.5">
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={selected()}
                                onChange={() => {
                                    haptic("selection")
                                    props.onChange(
                                        option.value
                                    )
                                }}
                                class="peer sr-only"
                            />
                            <span
                                class={cn(
                                    "flex size-8 items-center justify-center rounded-full ring-offset-1 ring-offset-elevated transition-[box-shadow,transform] duration-fast motion-reduce:transition-none group-active:scale-95 peer-focus-visible:ring-2 peer-focus-visible:ring-accent",
                                    selected()
                                        ? "ring-[1.5px] ring-label/70"
                                        : "ring-0 group-hover:ring-[1.5px] group-hover:ring-separator"
                                )}
                                style={{
                                    background: option.color,
                                }}
                            >
                                <Show when={selected()}>
                                    <svg
                                        aria-hidden="true"
                                        class="animate-in zoom-in-50 motion-reduce:animate-none"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2.6"
                                        style={{
                                            color: option.ink,
                                        }}
                                    >
                                        <path d="m5 12 4 4 10-10" />
                                    </svg>
                                </Show>
                            </span>
                            <span
                                class={cn(
                                    "text-caption2",
                                    selected()
                                        ? "font-semibold text-label"
                                        : "text-label-tertiary"
                                )}
                            >
                                {option.label}
                            </span>
                        </label>
                    )
                }}
            </For>
        </fieldset>
    )
}
