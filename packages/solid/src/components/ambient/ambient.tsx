/** @jsxImportSource solid-js */
import { Show, splitProps, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
export type AmbientProps = JSX.HTMLAttributes<HTMLElement> & {
    src?: string | null
    className?: string
}
export function Ambient(props: AmbientProps) {
    const [local, rest] = splitProps(props, [
        "src",
        "class",
        "className",
        "children",
    ])
    return (
        <section
            {...rest}
            class={cn(
                "relative isolate",
                local.class,
                local.className
            )}
        >
            <Show when={local.src}>
                {(src) => (
                    <img
                        aria-hidden="true"
                        src={src()}
                        alt=""
                        class="pointer-events-none absolute top-[38%] left-1/2 -z-10 size-[min(32rem,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover opacity-20 blur-3xl dark:size-[min(20rem,80vw)] dark:opacity-15 dark:blur-2xl mask-[radial-gradient(closest-side,black_35%,transparent)] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-1000"
                    />
                )}
            </Show>
            {local.children}
        </section>
    )
}
