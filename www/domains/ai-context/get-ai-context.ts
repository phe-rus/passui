import { accents, textStyles } from "@passui/react/tokens"
import {
    catalogGroups,
    getCatalog,
} from "@/domains/catalog/get-catalog"
import { getExampleSource } from "@/domains/catalog/get-example-source"
import type { CatalogEntry } from "@/domains/catalog/types"
import { guides } from "@/domains/guides/get-guides"

// Everything here is generated from the docs registry and the site's own
// words, so what an AI reads is exactly what the pages say. These import
// the catalog's files directly, not its index, to avoid an import cycle
// with the component page that uses them.

const describe =
    "Passui (@passui/react) is Pherus's design system: native React controls, design tokens and themes, with names drawn from SwiftUI."

/** One component as Markdown: what it is, its import, props and usage. */
export function getComponentMarkdown(
    entry: CatalogEntry,
    origin: string
): string {
    const { docs, content } = entry
    const props = Object.entries(content.propDescriptions)
        .map(([name, text]) => `- \`${name}\`: ${text}`)
        .join("\n")
    const practices = content.practices
        .map(
            (practice) =>
                `- ${practice.kind === "do" ? "Do" : "Don't"}: ${practice.text}`
        )
        .join("\n")
    return [
        `# ${docs.name}`,
        "",
        content.summary,
        "",
        content.usage,
        "",
        "```tsx",
        `import { ${docs.name} } from "${docs.importPath}"`,
        "```",
        "",
        "## Usage",
        "",
        "```tsx",
        getExampleSource(docs.slug, "usage"),
        "```",
        "",
        "## Options",
        "",
        props,
        "",
        "## Best practices",
        "",
        practices,
        "",
        "## Accessibility",
        "",
        content.accessibility
            .map((line) => `- ${line}`)
            .join("\n"),
        "",
        `Docs: ${origin}/components/${docs.slug}`,
    ].join("\n")
}

/** The llms.txt index: every guide and component, one line each. */
export function getLlmsTxt(origin: string): string {
    const catalog = getCatalog()
    const sections = catalogGroups.flatMap((group) => {
        const entries = catalog.filter(
            (entry) => entry.group === group
        )
        if (!entries.length) return []
        return [
            "",
            `## ${group}`,
            "",
            ...entries.map(
                ({ docs, content }) =>
                    `- [${docs.name}](${origin}/components/${docs.slug}): ${content.summary}`
            ),
        ]
    })
    return [
        "# Passui",
        "",
        `> ${describe}`,
        "",
        "## Docs",
        "",
        ...guides.map(
            (guide) =>
                `- [${guide.title}](${origin}${guide.path}): ${guide.summary}`
        ),
        ...sections,
        "",
        "## Optional",
        "",
        `- [Passui skill](${origin}/skills/passui/SKILL.md): rules and every component's import, for AI agents.`,
        "",
    ].join("\n")
}

/** The Passui skill: the rules to follow, then every component's import. */
export function getSkillMarkdown(origin: string): string {
    const catalog = getCatalog()
    const components = catalogGroups.flatMap((group) => {
        const entries = catalog.filter(
            (entry) => entry.group === group
        )
        if (!entries.length) return []
        return [
            "",
            `### ${group}`,
            "",
            ...entries.map(
                ({ docs, content }) =>
                    `- \`${docs.name}\` from \`${docs.importPath}\`: ${content.summary} ${content.usage}`
            ),
        ]
    })
    const styles = Object.keys(textStyles)
        .map(
            (name) =>
                `\`text-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}\``
        )
        .join(", ")
    return [
        "---",
        "name: passui",
        "description: Build React interfaces with Passui (@passui/react), Pherus's design system of native controls, tokens and themes. Use when writing or changing UI in an app that depends on @passui/react or @passui/tanstack.",
        "---",
        "",
        "# Passui",
        "",
        describe,
        "",
        "## Rules",
        "",
        "- Use Passui's controls before writing your own; never add shadcn, Radix or Base UI primitives.",
        "- Import each control from its own entry point, as listed below.",
        "- Use the color roles and text styles, never hex values, pixel font sizes or one-off shadows.",
        "- Every string comes from the app: pass labels as props, so the app can translate them.",
        "- Props with fixed options are string unions; pass one of the listed values.",
        "- Mount these once near the root when you use them: `<Toaster />`, `<ContextMenuHost />`, `<DialogHost />`, `<TooltipHost />`.",
        "- Respect light and dark, the reader's text size, Reduce Motion and each platform's look (`ios:`, `android:`, `macos:`, `windows:`, `linux:` variants).",
        "",
        "## Setup",
        "",
        "Passui works with any React framework, requires React 19 and Tailwind CSS 4, and does not require TanStack. CLI init generates passui/styles.css, passui/providers.tsx and wiring instructions in passui/README.md. Follow those instructions to configure the app root and Tailwind pipeline. Add --integration tanstack only for the optional integration.",
        "",
        "```sh",
        "bunx @passui/cli init",
        "# New projects: bunx @passui/cli create my-app --template vite|tanstack",
        "# Manual alternative: bun add @passui/react",
        "```",
        "",
        "```css",
        '/* once, in the root stylesheet; with @passui/tanstack, import "@passui/tanstack/styles.css" instead */',
        '@import "@passui/react/styles.css";',
        "```",
        "",
        "## Tokens",
        "",
        "- Grounds: `bg-background`, `bg-sidebar`, `bg-surface`, `bg-paper`, `bg-elevated`, `bg-fill`, `border-separator`.",
        "- Text: `text-label`, `text-label-secondary`, `text-label-tertiary`, `text-ink`.",
        "- Accent: `bg-accent`, `text-on-accent`, `text-accent-text`, `bg-accent-soft`. The accent follows `data-accent` on the root.",
        "- Status: `text-success`, `text-warning`, `text-danger`.",
        `- Text styles: ${styles}.`,
        "- Corners: `rounded-xs` 4, `sm` 6, `md` 8, `lg` 10, `xl` 12, `2xl` 14, `3xl` 16, `4xl` 20, `5xl` 24, `sheet` 28, `full`.",
        `- Accents: ${Object.values(accents)
            .map((accent) => accent.name)
            .join(", ")}.`,
        "",
        "## Components",
        ...components,
        "",
        `Full docs for any component: ${origin}/components/<name>. Index: ${origin}/llms.txt`,
        "",
    ].join("\n")
}
