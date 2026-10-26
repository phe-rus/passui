import { buttonStyle } from "@passui/solid/button"

export function ButtonLink() {
    return (
        <a
            href="#guide"
            class={buttonStyle({ variant: "secondary" })}
        >
            Read the guide
        </a>
    )
}
