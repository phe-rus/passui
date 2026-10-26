/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { Picker } from "../../src/components/picker/picker"
import { SegmentedControl } from "../../src/components/segmented-control/segmented-control"

test("picker SSR renders the current value without accessing the DOM or opening its portal", () => {
    const html = renderToString(() => (
        <Picker
            label="Workspace"
            value="team"
            options={[
                { value: "personal", label: "Personal" },
                { value: "team", label: "Team", lang: "en" },
            ]}
            onChange={() => {}}
        />
    ))
    expect(html).toContain('role="combobox"')
    expect(html).toContain('aria-expanded="false"')
    expect(html).toContain('lang="en"')
    expect(html).toContain("Team")
    expect(html).not.toContain('role="listbox"')
})

test("segmented controls start with a labelled radio group before measuring fit", () => {
    const html = renderToString(() => (
        <SegmentedControl
            label="Period"
            value="week"
            options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
            ]}
            onChange={() => {}}
        />
    ))
    expect(html).toContain("Period")
    expect(html.match(/type="radio"/g)).toHaveLength(2)
    expect(html.match(/ checked/g)).toHaveLength(1)
})
