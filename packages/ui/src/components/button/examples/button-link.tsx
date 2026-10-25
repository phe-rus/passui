import { buttonStyle } from "@passui/react/button"

export function ButtonLink() {
    return (
        <a
            href="#guide"
            className={buttonStyle({ variant: "secondary" })}
        >
            Read the guide
        </a>
    )
}
