/** @jsxImportSource solid-js */
import { Show, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
export type ViewControllerSize = "default" | "compact"
function Heading(props: {
    title: JSX.Element
    description?: JSX.Element
    action?: JSX.Element
    size?: ViewControllerSize
}) {
    return (
        <>
            <div
                class={cn(
                    "flex flex-wrap items-center gap-3",
                    props.size === "compact" &&
                        "justify-center text-center"
                )}
            >
                <h1
                    class={cn(
                        "min-w-0 wrap-anywhere",
                        props.size === "compact"
                            ? "text-[1.75rem] font-semibold tracking-tight"
                            : "text-3xl md:text-4xl"
                    )}
                >
                    {props.title}
                </h1>
                {props.action}
            </div>
            <Show when={props.description}>
                <p
                    class={cn(
                        "mt-2 max-w-prose text-subheadline leading-relaxed text-label-secondary",
                        props.size === "compact" &&
                            "mt-1 text-center"
                    )}
                >
                    {props.description}
                </p>
            </Show>
        </>
    )
}
export const ViewController = Object.assign(
    function ViewController(props: {
        heading: JSX.Element
        children?: JSX.Element
        className?: string
        class?: string
    }) {
        return (
            <article
                class={cn(
                    "container mx-auto flex w-full flex-col gap-5 py-20 md:max-w-3xl",
                    props.class,
                    props.className
                )}
            >
                <section>{props.heading}</section>
                {props.children}
            </article>
        )
    },
    { Heading }
)
