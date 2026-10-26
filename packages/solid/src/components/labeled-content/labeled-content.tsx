import { Show, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
export interface LabeledContentProps {
    label: string
    description?: string
    children: JSX.Element
    stacked?: boolean
    wide?: boolean
}
export function LabeledContent(props: LabeledContentProps) {
    return (
        <div
            class={cn(
                "flex flex-wrap gap-x-4 gap-y-2.5 px-4 py-3",
                props.stacked
                    ? "flex-col items-stretch"
                    : cn(
                          "items-center justify-between",
                          props.wide &&
                              "max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5"
                      )
            )}
        >
            <div
                class={cn(
                    "flex min-w-0 flex-1 flex-col break-normal",
                    !props.stacked && "basis-36",
                    props.wide && "max-sm:basis-auto"
                )}
            >
                <span class="text-subheadline text-label">
                    {props.label}
                </span>
                <Show when={props.description}>
                    <span class="text-footnote leading-snug text-label-secondary">
                        {props.description}
                    </span>
                </Show>
            </div>
            <div
                class={cn(
                    "ms-auto flex max-w-full min-w-0 shrink-0 justify-end [&>*]:max-w-full",
                    props.stacked && "w-full",
                    props.wide && "max-sm:w-full"
                )}
            >
                {props.children}
            </div>
        </div>
    )
}
