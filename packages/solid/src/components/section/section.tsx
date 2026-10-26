import { children, Show, type JSX } from "solid-js"
export interface SectionProps {
    title?: string
    footer?: JSX.Element
    children?: JSX.Element
}
export function Section(props: SectionProps) {
    const content = children(() => props.children)
    const footer = children(() => props.footer)
    return (
        <section
            aria-label={props.title}
            class="flex flex-col gap-2"
        >
            <Show when={props.title}>
                <h2 class="px-4 text-footnote font-medium text-label-tertiary">
                    {props.title}
                </h2>
            </Show>
            <Show when={content()}>
                <div class="flex flex-col divide-y divide-separator/60 overflow-hidden rounded-3xl border border-separator/60 bg-elevated">
                    {content()}
                </div>
            </Show>
            <Show when={footer()}>
                <p class="px-4 text-caption leading-snug text-label-tertiary">
                    {footer()}
                </p>
            </Show>
        </section>
    )
}
