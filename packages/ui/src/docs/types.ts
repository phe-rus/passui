import type { ComponentType, ReactNode } from "react"

/**
 * A choice among fixed options. The options are object keys, so the
 * record must name every member of the prop's union: adding a variant to
 * a component fails the typecheck here until its docs list it too.
 */
export type SelectControl<T extends string> = {
    kind: "select"
    options: Record<T, true>
    default: T
}

export type BooleanControl = {
    kind: "boolean"
    default: boolean
}

export type TextControl = {
    kind: "text"
    default: string
    /**
     * The prop is required, so the snippet always writes it, even at its
     * default value, and the copied code compiles.
     */
    required?: true
}

export type AnyControl =
    | SelectControl<string>
    | BooleanControl
    | TextControl

/** The control that fits a prop's type. */
export type ControlFor<V> = [NonNullable<V>] extends [boolean]
    ? BooleanControl
    : [NonNullable<V>] extends [string]
      ? string extends NonNullable<V>
          ? TextControl
          : SelectControl<NonNullable<V> & string>
      : never

/** Controls for any of a component's props, plus its text children. */
export type Controls<P> = {
    [K in Exclude<keyof P, "children">]?: ControlFor<P[K]>
} & { children?: TextControl }

/** The current value of every control. */
export type ControlValues<C> = {
    [K in keyof C]-?: NonNullable<C[K]> extends {
        kind: "select"
        options: infer O
    }
        ? keyof O & string
        : NonNullable<C[K]> extends BooleanControl
          ? boolean
          : string
}

/**
 * An example is a real React function in the component's `examples/`
 * folder, named `<slug>-<id>.tsx`; the site shows that file's source as
 * its code, so the code is always what runs. `playground` values let the
 * site open the example in the playground.
 */
export type Example<C> = {
    id: string
    component: ComponentType
    playground?: Partial<ControlValues<C>>
}

/** What the code snippet shows for children, when plain text is not enough. */
export type SnippetChildren = {
    imports: string[]
    children: string
    /** Literal string props, written as name="value". */
    extraProps?: Record<string, string>
    /** Code expressions, written as name={expression}: state and handlers. */
    expressionProps?: Record<string, string>
    /** Objects spread onto the element, written as {...name}. */
    spreadProps?: string[]
    /** Lines placed before the element, such as a useState call. */
    setup?: string[]
    /**
     * Demo-only controls the snippet writes itself, left out of the
     * generated props: a `critical` switch written as `tone="critical"`.
     */
    omit?: string[]
    /**
     * The element to write when it is a part rather than the export
     * itself: `Conversation.Messages` for `Conversation`.
     */
    element?: string
}

export type ComponentDocs<
    C,
    E extends readonly Example<C>[],
> = {
    /** Kebab case, unique across the registry, used in URLs. */
    slug: string
    /** The component's export name, as written in code. */
    name: string
    /** Where it is imported from, for example `@passui/react/button`. */
    importPath: string
    controls: C
    render: (values: ControlValues<C>) => ReactNode
    childrenSnippet?: (
        values: ControlValues<C>
    ) => SnippetChildren
    /** The smallest real use, shown under Usage (`<slug>-usage.tsx`). */
    usage: ComponentType
    /** A small, realistic interface built with it (`<slug>-showcase.tsx`). */
    showcase: ComponentType
    examples: E
    /**
     * The playground frame's least height in pixels, for components that
     * open something over the page (a sheet, a popover, a menu) that the
     * frame must have room to show.
     */
    previewHeight?: number
}

/**
 * Rejects select options that are not members of the prop's union, so
 * docs cannot offer a value the component does not accept.
 */
type ExactOptions<C, P> = {
    [K in keyof C]: K extends keyof P
        ? C[K] extends { kind: "select"; options: infer O }
            ? {
                  options: {
                      [Option in keyof O]: Option extends NonNullable<
                          P[K]
                      >
                          ? true
                          : never
                  }
              }
            : unknown
        : unknown
}

/**
 * Docs typed against a component's props. Curried so the props type is
 * given once and control keys and example ids stay exact:
 * `defineDocs<ButtonProps>()({ ... })`.
 */
export function defineDocs<P>() {
    return <
        const C extends Controls<P>,
        const E extends readonly Example<C>[],
    >(
        docs: ComponentDocs<C, E> & {
            controls: ExactOptions<C, P>
        }
    ) => docs
}

/** Any component's docs, as the registry holds them. */
export type RegisteredDocs = {
    slug: string
    name: string
    importPath: string
    controls: Record<string, AnyControl | undefined>
    examples: readonly {
        id: string
        component: ComponentType
        playground?: Record<string, string | boolean>
    }[]
    usage: ComponentType
    showcase: ComponentType
    previewHeight?: number
    render(
        values: Record<string, string | boolean>
    ): ReactNode
    childrenSnippet?(
        values: Record<string, string | boolean>
    ): SnippetChildren
}
