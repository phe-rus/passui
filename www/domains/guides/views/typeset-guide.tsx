import { textStyles } from "@passui/react/tokens"
import { DocSection, type TocItem } from "@/domains/catalog"
import { Code, CodeBlock, Prose } from "./guide-parts"

export const typesetSections: TocItem[] = [
    { id: "text-styles", title: "Text styles" },
    { id: "typeset", title: "The typeset utility" },
    { id: "tuning", title: "Tuning it" },
    { id: "opting-out", title: "Opting out" },
]

/** largeTitle → text-large-title, the class Passui generates. */
const className = (name: string) =>
    `text-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`

export function TypesetGuide({
    framework = "react",
}: {
    framework?: "react" | "solid"
}) {
    const attribute =
        framework === "solid" ? "class" : "className"
    return (
        <>
            <DocSection
                id="text-styles"
                title="Text styles"
                description="Apple's Dynamic Type, named as SwiftUI names it. Each scales with the app's text size and never goes below 11 px."
            >
                <div className="flex flex-col overflow-hidden rounded-4xl ring-1 ring-separator/60">
                    {Object.entries(textStyles).map(
                        ([name, style]) => (
                            <div
                                key={name}
                                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-separator/60 border-b p-4 last:border-0"
                            >
                                <span
                                    className={`${className(name)} text-label`}
                                    style={{
                                        fontWeight:
                                            style.weight,
                                    }}
                                >
                                    The quick brown fox
                                </span>
                                <span className="font-mono text-caption text-label-secondary">
                                    {className(name)} ·{" "}
                                    {style.size}/
                                    {style.lineHeight}
                                </span>
                            </div>
                        )
                    )}
                </div>
                <Prose>
                    There's no 14 px style: interface text
                    that once used it is{" "}
                    <Code>text-subheadline</Code>.
                </Prose>
            </DocSection>

            <DocSection
                id="typeset"
                title="The typeset utility"
                description="Calm, readable styles for long-form writing: help pages, release notes, legal text."
            >
                <Prose>
                    Add <Code>typeset</Code> to the element
                    holding the writing. Headings, paragraphs,
                    lists, quotes and code inside it are
                    styled for reading.
                </Prose>
                <div className="rounded-4xl bg-paper p-6 shadow-sm ring-1 ring-separator/60">
                    <div className="typeset">
                        <h2>
                            Getting back into your account
                        </h2>
                        <p>
                            If you lose your phone, you can
                            still sign in with your recovery
                            key or a trusted contact.
                        </p>
                        <ul>
                            <li>Use your recovery key</li>
                            <li>
                                Ask a recovery contact for a
                                code
                            </li>
                        </ul>
                        <blockquote>
                            Keep your recovery key somewhere
                            safe and offline.
                        </blockquote>
                    </div>
                </div>
                <CodeBlock
                    code={`<article ${attribute}="typeset">
    <h2>Getting back into your account</h2>
    <p>If you lose your phone, you can still sign in…</p>
</article>`}
                />
            </DocSection>

            <DocSection
                id="tuning"
                title="Tuning it"
                description="Size steps for common cases, and custom properties for the rest."
            >
                <Prose>
                    Pair <Code>typeset</Code> with a size
                    step: <Code>typeset-sm</Code>,{" "}
                    <Code>typeset-base</Code>,{" "}
                    <Code>typeset-md</Code>,{" "}
                    <Code>typeset-lg</Code> or{" "}
                    <Code>typeset-xl</Code>.
                </Prose>
                <CodeBlock
                    code={`<article ${attribute}="typeset typeset-sm">…</article>`}
                />
                <CodeBlock
                    lang="css"
                    code={`.release-notes {
    --typeset-size: 1rem;
    --typeset-leading: 1.65;
    --typeset-font-heading: var(--font-display);
    --typeset-font-mono: var(--font-mono);
}`}
                />
            </DocSection>

            <DocSection
                id="opting-out"
                title="Opting out"
                description="Controls inside writing keep their own styles."
            >
                <Prose>
                    Mark anything that isn't writing with{" "}
                    <Code>data-not-typeset</Code> or the{" "}
                    <Code>not-typeset</Code> class, as
                    Passui's own message threads do.{" "}
                    <Code>ComposeViewport</Code> puts{" "}
                    <Code>typeset</Code> on the whole body, so
                    this matters inside apps built on it.
                </Prose>
                <CodeBlock
                    code={`<form data-not-typeset>
    {/* fields and buttons keep Passui's control styles */}
</form>`}
                />
            </DocSection>
        </>
    )
}
