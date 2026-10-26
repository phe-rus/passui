import {
    createSignal,
    createUniqueId,
    For,
    Show,
    type JSX,
} from "solid-js"
import { cn } from "../../lib/class-names"
export interface TabViewProps<Value extends string> {
    options: readonly { value: Value; label: string }[]
    defaultValue: Value
    value?: Value
    onValueChange?: (value: Value) => void
    align?: "start" | "center"
    label: string
    children: (value: Value) => JSX.Element
    className?: string
    class?: string
}
export function TabView<Value extends string>(
    props: TabViewProps<Value>
) {
    const id = createUniqueId()
    const buttons: HTMLButtonElement[] = []
    const [selected, setSelected] = createSignal(
        props.defaultValue
    )
    const value = () =>
        props.options.some(
            (option) =>
                option.value === (props.value ?? selected())
        )
            ? (props.value ?? selected())
            : props.options[0]?.value
    function select(next: Value) {
        if (props.value === undefined) setSelected(() => next)
        props.onValueChange?.(next)
    }
    return (
        <Show when={value() !== undefined}>
            <div
                class={cn(
                    "flex w-full flex-col gap-5",
                    props.class,
                    props.className
                )}
            >
                <div
                    role="tablist"
                    aria-label={props.label}
                    class={cn(
                        "inline-flex h-8 w-fit max-w-full items-center gap-5 p-[3px]",
                        props.align === "start"
                            ? "self-start"
                            : "mx-auto justify-center"
                    )}
                >
                    <For each={props.options}>
                        {(option, index) => (
                            <button
                                type="button"
                                role="tab"
                                id={`${id}-tab-${index()}`}
                                aria-controls={`${id}-panel-${index()}`}
                                aria-selected={
                                    option.value === value()
                                }
                                tabIndex={
                                    option.value === value()
                                        ? 0
                                        : -1
                                }
                                ref={(element) => {
                                    buttons[index()] = element
                                }}
                                onClick={() =>
                                    select(option.value)
                                }
                                onKeyDown={(event) => {
                                    const rtl =
                                        getComputedStyle(
                                            event.currentTarget
                                        ).direction === "rtl"
                                    let next: number
                                    if (event.key === "Home")
                                        next = 0
                                    else if (
                                        event.key === "End"
                                    )
                                        next =
                                            props.options
                                                .length - 1
                                    else if (
                                        event.key ===
                                        "ArrowRight"
                                    )
                                        next =
                                            index() +
                                            (rtl ? -1 : 1)
                                    else if (
                                        event.key ===
                                        "ArrowLeft"
                                    )
                                        next =
                                            index() +
                                            (rtl ? 1 : -1)
                                    else return
                                    event.preventDefault()
                                    next =
                                        (next +
                                            props.options
                                                .length) %
                                        props.options.length
                                    const item =
                                        props.options[next]
                                    if (item)
                                        select(item.value)
                                    buttons[next]?.focus()
                                }}
                                class={cn(
                                    "relative inline-flex h-[calc(100%-1px)] shrink-0 items-center justify-center border border-transparent p-0 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 after:absolute after:inset-x-0 after:bottom-[-5px] after:h-0.5 after:bg-current",
                                    option.value === value()
                                        ? "after:opacity-100"
                                        : "opacity-60 hover:opacity-100 after:opacity-0"
                                )}
                            >
                                {option.label}
                            </button>
                        )}
                    </For>
                </div>
                <For each={props.options}>
                    {(option, index) => (
                        <div
                            role="tabpanel"
                            id={`${id}-panel-${index()}`}
                            aria-labelledby={`${id}-tab-${index()}`}
                            hidden={option.value !== value()}
                            class="w-full outline-offset-4"
                        >
                            <Show
                                when={
                                    option.value === value()
                                }
                            >
                                {props.children(option.value)}
                            </Show>
                        </div>
                    )}
                </For>
            </div>
        </Show>
    )
}
