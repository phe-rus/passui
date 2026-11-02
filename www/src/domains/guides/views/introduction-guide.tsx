import { Table, TableBody, TableRow, TableCell } from "@passui/react/table"
import { catalogIcons, LayersIcon, TypesetIcon } from "@passui/react/icons"
import { Link } from "@tanstack/react-router"
import { DocSection } from "@/domains/catalog/views/doc-section"
import type { TocItem } from "@/domains/catalog/views/on-this-page"
import { Code, Prose } from "./guide-parts"

export const introductionSections: TocItem[] = [
    { id: "what", title: "What's in Passui" },
    { id: "principles", title: "Principles" },
    { id: "packages", title: "Packages" },
    { id: "next", title: "Next steps" },
]

const parts = [
    {
        icon: catalogIcons.tap,
        title: "Native controls",
        text: "Buttons, fields, pickers, sheets and menus, implemented natively in React.",
    },
    {
        icon: catalogIcons.colors,
        title: "Design tokens",
        text: "Color roles, text styles, corners and springs, the same in light and dark.",
    },
    {
        icon: LayersIcon,
        title: "Appearance",
        text: "Theme and platform providers, so every control follows the system it runs on.",
    },
    {
        icon: TypesetIcon,
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
                    Passui is Pherus's design language, with native React components that share the
                    same appearance, motion and interaction principles across applications.
                </Prose>
                <div className="grid gap-3 sm:grid-cols-2">
                    {parts.map((part) => (
                        <div
                            key={part.title}
                            className="flex flex-col gap-2 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60"
                        >
                            <part.icon size={22} className="text-accent-text" />
                            <strong>{part.title}</strong>
                            <span>{part.text}</span>
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
                    <Table className="w-full text-start text-subheadline">
                        <TableBody>
                            <TableRow className="border-separator/60 border-b">
                                <TableCell className="whitespace-normal p-4 align-top">
                                    <Code>@passui/react</Code>
                                </TableCell>
                                <TableCell className="whitespace-normal p-4 text-label-secondary">
                                    Native React controls, appearance and hooks. Independent of
                                    routers and form libraries.
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-separator/60 border-b">
                                <TableCell className="whitespace-normal p-4 align-top">
                                    <Code>@passui/tokens</Code>
                                </TableCell>
                                <TableCell className="whitespace-normal p-4 text-label-secondary">
                                    Framework-independent colors, typography, layout and motion
                                    tokens.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="whitespace-normal p-4 align-top">
                                    <Code>@passui/tanstack</Code>
                                </TableCell>
                                <TableCell className="whitespace-normal p-4 text-label-secondary">
                                    Optional TanStack forms, tables, route boundaries and document
                                    helpers for React applications.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DocSection>

            <DocSection id="next" title="Next steps">
                <Prose>
                    Start with the{" "}
                    <Link to="/docs/$slug" params={{ slug: "installation" }}>
                        installation guide
                    </Link>
                    , browse the <Link to="/components">components</Link>, or give your AI agent
                    Passui's rules with a{" "}
                    <Link to="/docs/$slug" params={{ slug: "skills" }}>
                        skill
                    </Link>
                    .
                </Prose>
            </DocSection>
        </>
    )
}
