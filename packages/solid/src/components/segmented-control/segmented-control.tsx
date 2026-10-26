/** @jsxImportSource solid-js */
import {
    createSignal,
    createUniqueId,
    For,
    onCleanup,
    onMount,
    Show,
} from "solid-js"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { Picker } from "../picker/picker"
export interface SegmentedControlProps<T extends string> {
    value: T
    options: { value: T; label: string }[]
    onChange: (value: T) => void
    label: string
}
export function SegmentedControl<T extends string>(
    props: SegmentedControlProps<T>
) {
    let frame: HTMLDivElement | undefined
    let measure: HTMLDivElement | undefined
    const [fits, setFits] = createSignal(true)
    const id = createUniqueId()
    onMount(() => {
        const check = () => {
            if (frame && measure)
                setFits(
                    measure.offsetWidth <=
                        frame.clientWidth + 0.5
                )
        }
        check()
        const observer = new ResizeObserver(check)
        if (frame) observer.observe(frame)
        if (measure) observer.observe(measure)
        onCleanup(() => observer.disconnect())
    })
    return (
        <div ref={frame} class="relative w-full min-w-0">
            <div
                ref={measure}
                aria-hidden="true"
                class="pointer-events-none invisible absolute top-0 flex w-max p-[3px] text-footnote font-semibold"
            >
                <For each={props.options}>
                    {(option) => (
                        <span class="min-w-[64px] px-3 py-1 whitespace-nowrap">
                            {option.label}
                        </span>
                    )}
                </For>
            </div>
            <Show
                when={fits()}
                fallback={
                    <Picker
                        {...props}
                        searchable={false}
                        class="rounded-lg py-1.5 text-footnote font-semibold"
                    />
                }
            >
                <fieldset class="flex w-full rounded-lg bg-fill p-[3px] shadow-[inset_0_1px_2px_rgb(40_30_0/0.06)]">
                    <legend class="sr-only">
                        {props.label}
                    </legend>
                    <For each={props.options}>
                        {(option) => (
                            <label
                                class={cn(
                                    "relative isolate min-w-[64px] flex-1 cursor-pointer rounded-md px-3 py-1 text-center text-footnote whitespace-nowrap transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/60",
                                    option.value ===
                                        props.value
                                        ? "font-semibold text-label"
                                        : "font-medium text-label-secondary hover:text-label"
                                )}
                            >
                                <input
                                    type="radio"
                                    name={id}
                                    value={option.value}
                                    checked={
                                        option.value ===
                                        props.value
                                    }
                                    onChange={() => {
                                        haptic("selection")
                                        props.onChange(
                                            option.value
                                        )
                                    }}
                                    class="sr-only"
                                />
                                <Show
                                    when={
                                        option.value ===
                                        props.value
                                    }
                                >
                                    <span class="absolute inset-0 -z-10 rounded-md bg-elevated shadow-[0_0_0_0.5px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.08),0_3px_8px_-2px_rgb(0_0_0/0.10)]" />
                                </Show>
                                {option.label}
                            </label>
                        )}
                    </For>
                </fieldset>
            </Show>
        </div>
    )
}
