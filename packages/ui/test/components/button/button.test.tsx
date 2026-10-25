import { expect, test } from "vitest"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import {
    Button,
    buttonStyle,
    type ButtonProps,
} from "../../../src/components/button/button"
import {
    IconButton,
    type IconButtonProps,
} from "../../../src/components/button/icon-button"

const validButtonProps: ButtonProps = {
    variant: "default",
    size: "default",
}
const validIconButtonProps: IconButtonProps = {
    label: "Close",
    variant: "accent",
    size: "icon-sm",
}
const invalidButtonProps: ButtonProps = {
    // @ts-expect-error unsupported variants must fail type checking
    variant: "warning",
}
const invalidIconButtonProps: IconButtonProps = {
    label: "Close",
    // @ts-expect-error unsupported sizes must fail type checking
    size: "large",
}
const invalidLegacyButtonProps: ButtonProps = {
    // @ts-expect-error legacy variant names must fail type checking
    variant: "primary",
}
const invalidLegacyIconButtonProps: IconButtonProps = {
    label: "Close",
    // @ts-expect-error IconButton uses variant, not tone
    tone: "accent",
}
const invalidTextIconButtonProps: IconButtonProps = {
    label: "Close",
    // @ts-expect-error icon buttons do not accept text sizes
    size: "default",
}

void validButtonProps
void validIconButtonProps
void invalidButtonProps
void invalidIconButtonProps
void invalidLegacyButtonProps
void invalidLegacyIconButtonProps
void invalidTextIconButtonProps

test("button sizes use the shared semantic size map", () => {
    expect(buttonStyle({ size: "default" })).toContain("h-11")
    expect(buttonStyle({ size: "xs" })).toContain("h-8")
    expect(buttonStyle({ size: "sm" })).toContain("h-9")
    expect(buttonStyle({ size: "lg" })).toContain("h-12")
    expect(buttonStyle({ size: "icon" })).toContain("size-11")
    expect(buttonStyle({ size: "icon-xs" })).toContain(
        "size-8"
    )
    expect(buttonStyle({ size: "icon-sm" })).toContain(
        "size-9"
    )
    expect(buttonStyle({ size: "icon-lg" })).toContain(
        "size-12"
    )
    expect(buttonStyle({ size: "icon-full" })).toContain(
        "w-full"
    )
})

test("button variants map to Passui semantic treatments", () => {
    expect(buttonStyle({ variant: "default" })).toContain(
        "bg-inverse"
    )
    expect(buttonStyle({ variant: "destructive" })).toContain(
        "bg-danger"
    )
    expect(buttonStyle({ variant: "outline" })).toContain(
        "border-separator"
    )
    expect(buttonStyle({ variant: "secondary" })).toContain(
        "bg-elevated"
    )
    expect(buttonStyle({ variant: "ghost" })).toContain(
        "bg-transparent"
    )
    expect(buttonStyle({ variant: "link" })).toContain(
        "text-accent-text"
    )
    expect(buttonStyle({ variant: "accent" })).toContain(
        "bg-accent"
    )
})

test("icon button shares variants and uses square semantic sizes", () => {
    const markup = renderToStaticMarkup(
        createElement(
            IconButton,
            {
                label: "Delete",
                variant: "destructive",
                size: "icon-lg",
            },
            createElement("svg", { "aria-hidden": true })
        )
    )

    expect(markup).toContain("bg-danger")
    expect(markup).toContain("size-12")
    expect(markup).toContain('aria-label="Delete"')
})

test("a pending button stays disabled without replacing its label", () => {
    const markup = renderToStaticMarkup(
        createElement(
            Button,
            { isPending: true },
            "Save changes"
        )
    )

    expect(markup).toContain("disabled")
    expect(markup).toContain('aria-busy="true"')
    expect(markup).toContain("Save changes")
})

test("a pending icon button keeps its accessible name", () => {
    const markup = renderToStaticMarkup(
        createElement(
            IconButton,
            { label: "Close", isPending: true },
            createElement("svg", { "aria-hidden": true })
        )
    )

    expect(markup).toContain('aria-label="Close"')
    expect(markup).toContain('aria-busy="true"')
    expect(markup).toContain("disabled")
})
