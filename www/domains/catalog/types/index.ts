import type { CodeLang } from "@/domains/playground"
import type { IconSvgElement } from "@hugeicons/react"
import type { RegisteredDocs } from "@passui/react/docs"

type DocsShape = {
    controls: object
    examples: readonly { id: string }[]
}

export type ExampleContent = {
    title: string
    description: string
}

export type AnatomyPart = {
    element: string
    description: string
    required?: boolean
}

export type Practice = {
    kind: "do" | "dont"
    text: string
}

/**
 * The site's words for one component, typed against its docs: a new
 * control without a description, or an example without words, fails the
 * typecheck.
 */
export type ComponentContent<D extends DocsShape> = {
    summary: string
    /** One sentence on when to reach for it, above the import. */
    usage: string
    propDescriptions: Record<
        keyof D["controls"] & string,
        string
    >
    examples: Record<
        D["examples"][number]["id"],
        ExampleContent
    >
    anatomy: AnatomyPart[]
    practices: Practice[]
    accessibility: string[]
}

/** Where a component sits in the sidebar. */
export type CatalogGroup =
    | "Controls"
    | "Layout and disclosure"
    | "Navigation"
    | "Presentation"
    | "Feedback"
    | "Content"
    | "Compositions"

/** A component's docs and the site's words for it, together. */
export type CatalogEntry = {
    group: CatalogGroup
    /** The sidebar icon, picked to picture this component. */
    icon: IconSvgElement
    docs: RegisteredDocs
    content: ComponentContent<DocsShape>
}

export type InstallStep = {
    title: string
    code: string
    /** The code's language; TSX when left out. */
    lang?: CodeLang
}
