/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { Button } from "../../src/components/button/button"
import { IconButton } from "../../src/components/button/icon-button"

test("buttons retain native semantics and source-compatible variants during SSR", () => {
    const html = renderToString(() => (
        <Button variant="accent" size="sm">
            Save
        </Button>
    ))
    expect(html).toContain('type="button"')
    expect(html).toContain("bg-accent")
    expect(html).toContain("h-9")
    expect(html).toContain("Save")
})

test("pending buttons are busy, disabled and keep their label", () => {
    const html = renderToString(() => (
        <Button isPending>Saving</Button>
    ))
    expect(html).toContain('aria-busy="true"')
    expect(html).toContain("disabled")
    expect(html).toContain("Saving")
    expect(html).not.toContain("border-t-current")
})

test("icon buttons provide an accessible name and tooltip", () => {
    const html = renderToString(() => (
        <IconButton label="Close" size="icon-sm">
            ×
        </IconButton>
    ))
    expect(html).toContain('aria-label="Close"')
    expect(html).toContain('data-tooltip="Close"')
    expect(html).toContain("size-9")
})
