import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { DisclosureGroup } from "../../src/components/disclosure-group/disclosure-group"
import { Menu } from "../../src/components/menu/menu"

test("menu trigger is named, keyboard-addressable and backed by the menu host", () => {
    const markup = renderToStaticMarkup(
        <Menu
            label="More actions"
            items={[{ label: "Rename", onSelect: () => {} }, "divider"]}
            variant="ghost"
        >
            More
        </Menu>
    )
    expect(markup).toContain('aria-haspopup="menu"')
    expect(markup).toContain('aria-expanded="false"')
    expect(markup).toContain('aria-label="More actions"')
    expect(markup).toContain("More")
})

test("disabled menu retains its accessible name and cannot open", () => {
    const markup = renderToStaticMarkup(
        <Menu label="Unavailable" disabled items={[]}>
            More
        </Menu>
    )
    expect(markup).toContain("disabled")
    expect(markup).toContain('aria-expanded="false"')
})

test("disclosure exposes expanded state and a labelled region", () => {
    const markup = renderToStaticMarkup(
        <DisclosureGroup label="Advanced" open onOpenChange={() => {}} description="Extra settings">
            <p>More options</p>
        </DisclosureGroup>
    )
    expect(markup).toContain('aria-expanded="true"')
    expect(markup).toContain('aria-controls="')
    expect(markup).toContain("<section")
    expect(markup).toContain("aria-labelledby=")
    expect(markup).toContain("More options")
    expect(markup).toContain("Extra settings")
})

test("collapsed disclosure keeps its trigger and region accessible", () => {
    const markup = renderToStaticMarkup(
        <DisclosureGroup label="Advanced" open={false} onOpenChange={() => {}} disabled>
            <p>Hidden details</p>
        </DisclosureGroup>
    )
    expect(markup).toContain('aria-expanded="false"')
    expect(markup).toContain("disabled")
    expect(markup).toContain("<section")
    expect(markup).not.toContain("Hidden details")
})
