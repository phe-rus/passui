import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { DisclosureGroup } from "../../src/components/disclosure-group/disclosure-group"
import { Menu } from "../../src/components/menu/menu"
import { SearchField } from "../../src/components/search-field/search-field"
import {
    SearchList,
    SearchListField,
    SearchListGroup,
    SearchListItem,
    SearchListResults,
} from "../../src/components/search-list/search-list"
import { SegmentedControl } from "../../src/components/segmented-control/segmented-control"
import { Section } from "../../src/components/section/section"
import { SidebarSection } from "../../src/components/sidebar/sidebar"
import { TabBar } from "../../src/components/tab-bar/tab-bar"
import { TabView } from "../../src/components/tab-view/tab-view"
import { Toaster } from "../../src/components/toast/toaster"
import { Toggle } from "../../src/components/toggle/toggle"

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

test("tab view exposes one selected tab and disables unavailable destinations", () => {
    const markup = renderToStaticMarkup(
        <TabView
            label="Profile sections"
            defaultValue="billing"
            options={[
                { value: "account", label: "Account" },
                { value: "billing", label: "Billing", disabled: true },
                { value: "security", label: "Security" },
            ]}
        >
            {(value) => <p>{value} content</p>}
        </TabView>
    )
    expect(markup).toContain('role="tablist"')
    expect(markup).toContain('aria-label="Profile sections"')
    expect(markup).toContain('aria-disabled="true"')
    expect(markup).toContain('aria-selected="true"')
    expect(markup).toContain("account content")
    expect(markup).not.toContain("billing content")
})

test("search list wires its combobox to the results and excludes disabled options", () => {
    const markup = renderToStaticMarkup(
        <SearchList loop={false}>
            <SearchListField aria-label="Find a command" />
            <SearchListResults>
                <SearchListItem value="Rename" disabled>
                    Rename
                </SearchListItem>
                <SearchListItem value="Share">Share</SearchListItem>
            </SearchListResults>
        </SearchList>
    )
    expect(markup).toContain('role="combobox"')
    expect(markup).toContain('aria-controls="')
    expect(markup).toContain('role="listbox"')
    expect(markup).toContain('role="option"')
    expect(markup).toContain("disabled")
})

test("tab bar keeps destinations named for assistive technologies", () => {
    const markup = renderToStaticMarkup(
        <TabBar
            label="Primary navigation"
            active="home"
            minimizeBehavior="never"
            tabs={[
                { id: "home", label: "Home", icon: <span aria-hidden="true">H</span> },
                { id: "settings", label: "Settings", icon: <span aria-hidden="true">S</span> },
            ]}
            renderLink={(tab, props) => <a href={`/${tab.id}`} {...props} />}
        />
    )
    expect(markup).toContain('aria-label="Primary navigation"')
    expect(markup).toContain('aria-current="page"')
    expect(markup).toContain("Home")
    expect(markup).toContain("Settings")
})

test("segmented control and toggle retain native accessible controls", () => {
    const segments = renderToStaticMarkup(
        <SegmentedControl
            label="Appearance"
            value="light"
            options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
            ]}
            onChange={() => {}}
        />
    )
    const toggle = renderToStaticMarkup(
        <Toggle checked label="Notifications" onChange={() => {}} />
    )
    expect(segments).toContain("<fieldset")
    expect(segments).toContain("Appearance")
    expect(segments).toContain('type="radio"')
    expect(toggle).toContain('role="switch"')
    expect(toggle).toContain('aria-checked="true"')
    expect(toggle).toContain('aria-label="Notifications"')
})

test("search result groups expose their headings as listbox groups", () => {
    const markup = renderToStaticMarkup(
        <SearchList>
            <SearchListField aria-label="Find a command" />
            <SearchListResults>
                <SearchListGroup heading="File actions">
                    <SearchListItem value="Rename">Rename</SearchListItem>
                </SearchListGroup>
            </SearchListResults>
        </SearchList>
    )
    expect(markup).toContain('role="listbox"')
    expect(markup).toContain('role="group"')
    expect(markup).toMatch(/role="group"[^>]*aria-labelledby="([^"]+)"/)
    expect(markup).toContain("File actions")
    expect(markup).not.toContain("<fieldset")
})

test("sections and sidebar groups associate their headings with their regions", () => {
    const markup = renderToStaticMarkup(
        <>
            <Section title="Preferences">
                <p>Options</p>
            </Section>
            <SidebarSection title="Workspace">
                <a href="/home">Home</a>
            </SidebarSection>
        </>
    )
    expect(markup).toMatch(/<section aria-labelledby="([^"]+)"/)
    expect(markup).toContain("Preferences")
    expect(markup).toContain("Workspace")
    expect(markup.match(/aria-labelledby=/g)).toHaveLength(2)
    expect(markup.match(/<h2/g)).toHaveLength(2)
})

test("search field has a usable accessible name and honors an external label", () => {
    const defaultField = renderToStaticMarkup(<SearchField placeholder="Find records" />)
    const namedField = renderToStaticMarkup(
        <SearchField aria-labelledby="search-title" placeholder="Search" />
    )
    expect(defaultField).toContain('aria-label="Find records"')
    expect(defaultField).toContain('aria-hidden="true"')
    expect(namedField).toContain('aria-labelledby="search-title"')
    expect(namedField).not.toContain("aria-label=")
})

test("multiple toaster hosts isolate their SVG filters and accept localized labels", () => {
    const markup = renderToStaticMarkup(
        <>
            <Toaster label="Updates" />
            <Toaster label="Messages" />
        </>
    )
    const ids = [...markup.matchAll(/<filter id="([^"]+)"/g)].map((match) => match[1])
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    expect(markup).toContain('aria-label="Updates"')
    expect(markup).toContain('aria-label="Messages"')
})
