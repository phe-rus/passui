import { For, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"

type IconShape = readonly (readonly [
    string,
    Record<string, string | number>,
])[]

/** Render the same Hugeicons SVG paths as React without bringing React into Solid. */
export function Hugeicon(props: {
    icon: IconShape
    size?: number
    strokeWidth?: number
    class?: string
    "aria-hidden"?: boolean
}): JSX.Element {
    return (
        <svg
            aria-hidden={props["aria-hidden"] ?? true}
            width={props.size ?? 20}
            height={props.size ?? 20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            class={props.class}
        >
            <title>Decorative icon</title>
            <For each={props.icon}>
                {([tag, attributes]) => (
                    <Dynamic
                        component={tag as "path"}
                        {...{
                            ...attributes,
                            strokeWidth:
                                props.strokeWidth ??
                                attributes.strokeWidth,
                        }}
                    />
                )}
            </For>
        </svg>
    )
}
