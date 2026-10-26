/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { TextField } from "../../src/components/text-field/text-field"
import { SecureField } from "../../src/components/secure-field/secure-field"
import { Toggle } from "../../src/components/toggle/toggle"
import { Section } from "../../src/components/section/section"
import { LabeledContent } from "../../src/components/labeled-content/labeled-content"
import { StatTile } from "../../src/components/stat-tile/stat-tile"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "../../src/components/profile-image/profile-image"
import { SwatchPicker } from "../../src/components/swatch-picker/swatch-picker"
import { TabView } from "../../src/components/tab-view/tab-view"

test("field labels, errors and user descriptions remain connected during SSR", () => {
    const html = renderToString(() => (
        <TextField
            id="email"
            label="Email"
            value="invalid"
            aria-describedby="extra"
            errors={["Invalid address", "Invalid address"]}
        />
    ))
    expect(html).toContain('for="email"')
    expect(html).toContain('id="email"')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain(
        'aria-describedby="extra email-description"'
    )
    expect(html).toContain('role="alert"')
    expect(html.match(/Invalid address/g)).toHaveLength(1)
})

test("secure fields start masked and name the reveal action", () => {
    const html = renderToString(() => (
        <SecureField
            label="Password"
            revealLabels={{
                show: "Show password",
                hide: "Hide password",
            }}
        />
    ))
    expect(html).toContain('type="password"')
    expect(html).toContain('aria-label="Show password"')
    expect(html).toContain('aria-pressed="false"')
})

test("switches and mixed checkboxes expose the correct accessible state", () => {
    const switchHtml = renderToString(() => (
        <Toggle
            label="Sync"
            checked
            disabled
            onChange={() => {}}
        />
    ))
    expect(switchHtml).toContain('role="switch"')
    expect(switchHtml).toContain('aria-checked="true"')
    expect(switchHtml).toContain("disabled")
    const checkbox = renderToString(() => (
        <Toggle
            style="checkbox"
            label="Select all"
            checked={false}
            mixed
            onChange={() => {}}
        />
    ))
    expect(checkbox).toContain('aria-checked="mixed"')
    expect(checkbox).toContain('type="checkbox"')
})

test("grouped content and stat tiles preserve semantic presentation", () => {
    const html = renderToString(() => (
        <Section
            title="Account"
            footer="Only you can see this"
        >
            <LabeledContent
                label="Email"
                description="Primary"
            >
                hello@example.com
            </LabeledContent>
        </Section>
    ))
    expect(html).toContain('aria-label="Account"')
    expect(html).toContain("Only you can see this")
    expect(html).toContain("Primary")
    const statistic = renderToString(() => (
        <StatTile
            label="People"
            value={1284}
            active
            onClick={() => {}}
        />
    ))
    expect(statistic).toContain('aria-pressed="true"')
    expect(statistic).toContain("1,284")
})

test("profile image fallbacks are available before image load", () => {
    const html = renderToString(() => (
        <ProfileImage>
            <ProfileImageContent
                src="/avatar.png"
                alt="Aiko"
            />
            <ProfileImageFallback>AK</ProfileImageFallback>
        </ProfileImage>
    ))
    expect(html).toContain('alt="Aiko"')
    expect(html).toContain("AK")
})

test("swatches are a labelled native radio group with one selection", () => {
    const html = renderToString(() => (
        <SwatchPicker
            label="Accent"
            value="blush"
            onChange={() => {}}
            options={[
                {
                    value: "blush",
                    label: "Blush",
                    color: "pink",
                    ink: "black",
                },
                {
                    value: "ocean",
                    label: "Ocean",
                    color: "blue",
                    ink: "white",
                },
            ]}
        />
    ))
    expect(html).toContain("Accent")
    expect(html.match(/type="radio"/g)).toHaveLength(2)
    expect(html.match(/ checked/g)).toHaveLength(1)
})

test("tabs link tab and panel ids and render only the selected content", () => {
    const html = renderToString(() => (
        <TabView
            label="Details"
            defaultValue="first"
            options={[
                { value: "first", label: "First" },
                { value: "second", label: "Second" },
            ]}
        >
            {(value) => (
                <p>
                    {value === "first"
                        ? "First panel"
                        : "Second panel"}
                </p>
            )}
        </TabView>
    ))
    expect(html.match(/role="tab"/g)).toHaveLength(2)
    expect(html.match(/role="tabpanel"/g)).toHaveLength(2)
    expect(html).toContain("First panel")
    expect(html).not.toContain("Second panel")
    expect(
        renderToString(() => (
            <TabView
                label="Empty"
                defaultValue="none"
                options={[]}
            >
                {() => null}
            </TabView>
        ))
    ).not.toContain('role="tab"')
})
