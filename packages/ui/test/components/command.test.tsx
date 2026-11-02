import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandShortcut,
} from "../../src/components/command/command"

test("command composition exposes named groups, options and shortcut hints", () => {
    const html = renderToStaticMarkup(
        <Command>
            <CommandInput placeholder="Find an action" />
            <CommandList>
                <CommandGroup heading="Navigation">
                    <CommandItem value="Home">
                        Home<CommandShortcut>⌘ H</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="Archive" disabled>
                        Archive
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    )
    expect(html).toContain('role="combobox"')
    expect(html).toContain('role="listbox"')
    expect(html).toContain('role="group"')
    expect(html).toContain("aria-labelledby=")
    expect(html).toContain('role="option"')
    expect(html).toContain('disabled=""')
    expect(html).toContain("⌘ H</kbd>")
    expect(html).not.toContain("aria-keyshortcuts=")
})
