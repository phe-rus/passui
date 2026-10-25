import {
    ColorsIcon,
    Layers01Icon,
    Tap01Icon,
    TextIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"
import { DocSection, type TocItem } from "@/domains/catalog"
import { Code, Prose } from "./guide-parts"

export const introductionSections: TocItem[] = [
    { id: "what", title: "What's in Passui" },
    { id: "principles", title: "Principles" },
    { id: "packages", title: "Packages" },
    { id: "next", title: "Next steps" },
]

const parts = [
    {
        icon: Tap01Icon,
        title: "Native controls",
        text: "Buttons, fields, pickers, sheets and menus, written as plain React you can read.",
    },
    {
        icon: ColorsIcon,
        title: "Design tokens",
        text: "Color roles, text styles, corners and springs, the same in light and dark.",
    },
    {
        icon: Layers01Icon,
        title: "Appearance",
        text: "Theme and platform providers, so every control follows the system it runs on.",
    },
    {
        icon: TextIcon,
        title: "Typeset",
        text: "Calm styles for long-form writing, from help pages to legal text.",
    },
]

const principles = [
    "Ask what Apple would do in 2026, then add our own touch.",
    "Name things as SwiftUI does: Toggle, Picker, Sheet, footnote.",
    "Use named tokens, never one-off colors, sizes or shadows.",
    "Every string comes from the app, so every app can translate.",
    "Respect the system: light and dark, text size, Reduce Motion and each platform's look.",
]

export function IntroductionGuide() {
    return (
        <>
            <DocSection id="what" title="What's in Passui">
                <Prose>
                    Passui is Pherus's design language: what
                    Liquid Glass is to Apple and Material 3 is
                    to Google. It's built for any React app,
                    and knows nothing about any one product.
                </Prose>
                <div className="grid gap-3 sm:grid-cols-2">
                    {parts.map((part) => (
                        <div
                            key={part.title}
                            className="flex flex-col gap-2 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60"
                        >
                            <HugeiconsIcon
                                icon={part.icon}
                                size={22}
                                className="text-accent-text"
                            />
                            <span className="text-headline font-semibold text-label">
                                {part.title}
                            </span>
                            <span className="text-footnote text-label-secondary">
                                {part.text}
                            </span>
                        </div>
                    ))}
                </div>
            </DocSection>

            <DocSection id="principles" title="Principles">
                <ul className="m-0 flex list-disc flex-col gap-2 ps-5 text-callout text-label">
                    {principles.map((line) => (
                        <li key={line}>{line}</li>
                    ))}
                </ul>
            </DocSection>

            <DocSection id="packages" title="Packages">
                <div className="overflow-hidden rounded-4xl ring-1 ring-separator/60">
                    <table className="w-full text-start text-subheadline">
                        <tbody>
                            <tr className="border-separator/60 border-b">
                                <td className="p-4 align-top">
                                    <Code>@passui/react</Code>
                                </td>
                                <td className="p-4 text-label-secondary">
                                    Controls, tokens, styles,
                                    appearance and hooks. No
                                    router or form library.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 align-top">
                                    <Code>
                                        @passui/tanstack
                                    </Code>
                                </td>
                                <td className="p-4 text-label-secondary">
                                    Forms, tables, route
                                    boundaries and the
                                    document shell, built on
                                    TanStack and on Passui's
                                    controls.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocSection>

            <DocSection id="next" title="Next steps">
                <Prose>
                    Start with{" "}
                    <Link
                        to="/docs/$slug"
                        params={{ slug: "installation" }}
                    >
                        Installation
                    </Link>
                    , browse the{" "}
                    <Link to="/components">components</Link>,
                    or give your AI agent Passui's rules with
                    a{" "}
                    <Link
                        to="/docs/$slug"
                        params={{ slug: "skills" }}
                    >
                        skill
                    </Link>
                    .
                </Prose>
            </DocSection>
        </>
    )
}
