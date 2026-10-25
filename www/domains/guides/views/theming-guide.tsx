import { Button } from "@passui/react/button"
import { Toggle } from "@passui/react/toggle"
import {
    type AccentId,
    accents,
    dark,
    light,
    radius,
} from "@passui/react/tokens"
import { type CSSProperties, useState } from "react"
import { DocSection, type TocItem } from "@/domains/catalog"
import { Code, CodeBlock, Prose } from "./guide-parts"

export const themingSections: TocItem[] = [
    { id: "appearance", title: "Light and dark" },
    { id: "accents", title: "Accents" },
    { id: "platforms", title: "Platform looks" },
    { id: "roles", title: "Color roles" },
    { id: "corners", title: "Corners" },
]

/** labelSecondary → label-secondary, as the Tailwind classes name it. */
const kebab = (name: string) =>
    name.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
    )

/** A small settings card, used to show a theme or an accent. */
function SampleCard({ title }: { title: string }) {
    const [on, setOn] = useState(true)
    return (
        <div className="flex flex-col gap-3 rounded-4xl bg-elevated p-5 text-label shadow-sm ring-1 ring-separator/60">
            <span className="text-headline font-semibold">
                {title}
            </span>
            <Toggle
                label="Sync across devices"
                checked={on}
                onChange={setOn}
            />
            <Button
                variant="accent"
                size="sm"
                className="self-start"
            >
                Save
            </Button>
        </div>
    )
}

function AccentPreview() {
    const [chosen, setChosen] = useState<AccentId>("ocean")
    const colors = accents[chosen].light
    // the four accent roles, set on this card alone
    const style = {
        "--color-accent": colors.accent,
        "--color-on-accent": colors.onAccent,
        "--color-accent-text": colors.accentText,
        "--color-accent-soft": colors.accentSoft,
    } as CSSProperties

    return (
        <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
            <div className="flex flex-wrap gap-3">
                {Object.values(accents).map((accent) => (
                    <button
                        key={accent.id}
                        type="button"
                        aria-pressed={accent.id === chosen}
                        onClick={() => setChosen(accent.id)}
                        className="flex flex-col items-center gap-1.5 rounded-3xl p-2 text-caption text-label-secondary hover:bg-fill/60 aria-pressed:text-label"
                    >
                        <span
                            className="size-10 rounded-full ring-2 ring-separator/60 in-aria-pressed:ring-label"
                            style={{
                                background: accent.swatch,
                            }}
                        />
                        {accent.name}
                    </button>
                ))}
            </div>
            <div data-theme="light" style={style}>
                <SampleCard title={accents[chosen].name} />
            </div>
        </div>
    )
}

export function ThemingGuide() {
    const roles = Object.keys(light) as (keyof typeof light)[]

    return (
        <>
            <DocSection
                id="appearance"
                title="Light and dark"
                description="Every color is a role with a light and a dark value, so nothing needs a dark: variant."
            >
                <Prose>
                    <Code>ThemeProvider</Code> sets{" "}
                    <Code>data-theme</Code> on the root from
                    the person's choice or the system. Like
                    SwiftUI's <Code>colorScheme</Code>,{" "}
                    <Code>data-theme</Code> also works on any
                    element, so one surface can keep its own
                    appearance.
                </Prose>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div
                        data-theme="light"
                        className="rounded-5xl bg-background p-4"
                    >
                        <SampleCard title="Light" />
                    </div>
                    <div
                        data-theme="dark"
                        className="rounded-5xl bg-background p-4"
                    >
                        <SampleCard title="Dark" />
                    </div>
                </div>
                <CodeBlock
                    code={`<section data-theme="dark" className="bg-background">
    {/* always dark, whatever the app's appearance */}
</section>`}
                />
            </DocSection>

            <DocSection
                id="accents"
                title="Accents"
                description="Seven accents, each setting accent, on-accent, accent-text and accent-soft. Blush is the default."
            >
                <AccentPreview />
                <Prose>
                    Set the accent on the root, and every
                    control follows it.
                </Prose>
                <CodeBlock
                    code={`<html data-accent="ocean">`}
                />
            </DocSection>

            <DocSection
                id="platforms"
                title="Platform looks"
                description="Apple platforms get glass; Android keeps the solid bars people expect there."
            >
                <Prose>
                    <Code>PlatformScript</Code> sets{" "}
                    <Code>data-os</Code> before the first
                    paint. The <Code>ios:</Code>,{" "}
                    <Code>android:</Code>, <Code>macos:</Code>
                    , <Code>windows:</Code> and{" "}
                    <Code>linux:</Code> variants then style
                    for one platform. Try each in the
                    playground's settings on any component
                    page.
                </Prose>
                <CodeBlock
                    code={`<nav className="glass android:bg-elevated android:shadow-none">
    {/* glass on Apple platforms, a solid bar on Android */}
</nav>`}
                />
            </DocSection>

            <DocSection
                id="roles"
                title="Color roles"
                description="Use the role, never the hex value. Each is a Tailwind color: bg-elevated, text-label-secondary, border-separator."
            >
                <div className="overflow-x-auto rounded-4xl ring-1 ring-separator/60">
                    <table className="w-full text-start text-subheadline">
                        <thead>
                            <tr className="border-separator/60 border-b text-footnote text-label-secondary">
                                <th className="p-3 text-start font-semibold">
                                    Role
                                </th>
                                <th className="p-3 text-start font-semibold">
                                    Light
                                </th>
                                <th className="p-3 text-start font-semibold">
                                    Dark
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr
                                    key={role}
                                    className="border-separator/60 border-b last:border-0"
                                >
                                    <td className="p-3">
                                        <Code>
                                            {kebab(role)}
                                        </Code>
                                    </td>
                                    {[
                                        light[role],
                                        dark[role],
                                    ].map((value, index) => (
                                        <td
                                            key={index}
                                            className="p-3"
                                        >
                                            <span className="flex items-center gap-2 font-mono text-caption text-label-secondary">
                                                <span
                                                    className="size-5 shrink-0 rounded-md ring-1 ring-separator/60"
                                                    style={{
                                                        background:
                                                            value,
                                                    }}
                                                />
                                                {value}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DocSection>

            <DocSection
                id="corners"
                title="Corners"
                description="Steps of 2 px while small and 4 px beyond. Keep nested corners concentric: inner radius is the outer radius minus the padding between them."
            >
                <div className="flex flex-wrap gap-4">
                    {Object.entries(radius)
                        .filter(([name]) => name !== "full")
                        .map(([name, value]) => (
                            <div
                                key={name}
                                className="flex flex-col items-center gap-2"
                            >
                                <span
                                    className="size-16 bg-accent-soft ring-1 ring-accent-text/30"
                                    style={{
                                        borderRadius: value,
                                    }}
                                />
                                <span className="font-mono text-caption text-label-secondary">
                                    rounded-{name} · {value}
                                </span>
                            </div>
                        ))}
                </div>
            </DocSection>
        </>
    )
}
