import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { Popover } from "../../src/components/popover/popover"

test("anchored popover keeps caller children directly in the authored layout", () => {
    const html = renderToStaticMarkup(
        <Popover open anchorRef={{ current: null }} className="flex flex-col gap-3">
            <p data-content="">Account</p>
            <button type="button">Manage</button>
        </Popover>
    )
    expect(html).toContain('data-popover-surface=""')
    expect(html).toMatch(/<\/div><p data-content="">Account<\/p><button/)
    expect(html).toContain("--popover-content-opacity")
    expect(html).not.toContain("overflow-y:auto")
})
