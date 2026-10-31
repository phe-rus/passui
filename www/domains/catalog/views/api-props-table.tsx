import { DocSection } from "./doc-section"

export interface ApiProp {
    name: string
    type: string
    required: boolean
    description: string
    defaultValue: string | null
}
export interface ApiSurface {
    props: ApiProp[]
    native: string[]
}
export interface ApiReference extends ApiSurface {
    source: string
    parts: (ApiSurface & { name: string })[]
}

function SurfaceTable({
    surface,
    descriptions = {},
}: {
    surface: ApiSurface
    descriptions?: Record<string, string>
}) {
    return (
        <div className="flex flex-col gap-3">
            {surface.props.length > 0 && (
                <div className="overflow-x-auto rounded-xl ring-1 ring-separator/60">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-fill/50 *:text-sm!">
                            <tr>
                                <th className="px-3 py-2">
                                    Prop
                                </th>
                                <th className="px-3 py-2">
                                    Type
                                </th>
                                <th className="px-3 py-2">
                                    Default
                                </th>
                                <th className="px-3 py-2">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="*:text-xs!">
                            {surface.props.map((prop) => (
                                <tr
                                    key={prop.name}
                                    className="border-separator/60 border-t align-top"
                                >
                                    <td className="px-3 py-2 font-mono font-semibold whitespace-nowrap">
                                        {prop.name}
                                        {prop.required && (
                                            <span
                                                className="ms-1 text-accent-text"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        )}
                                    </td>
                                    <td className="max-w-72 px-3 py-2 font-mono wrap-break-word">
                                        {prop.type}
                                    </td>
                                    <td className="px-3 py-2 font-mono">
                                        {prop.defaultValue ??
                                            "—"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {prop.description ||
                                            descriptions[
                                            prop.name
                                            ] ||
                                            "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {surface.props.some((prop) => prop.required) && (
                <p className="text-caption text-label-tertiary">
                    * Required
                </p>
            )}
            {surface.native.length > 0 && (
                <p className="text-footnote text-label-secondary">
                    Also accepts native props through{" "}
                    {surface.native.map((type, index) => (
                        <span key={type}>
                            {index > 0 && ", "}
                            <code>{type}</code>
                        </span>
                    ))}
                    .
                </p>
            )}
        </div>
    )
}

/** Source-derived custom props, inherited native contracts, and compound parts. */
export function ApiPropsTable({
    reference,
    descriptions,
}: {
    reference: ApiReference
    descriptions: Record<string, string>
}) {
    return (
        <div className="flex flex-col gap-5">
            <SurfaceTable
                surface={reference}
                descriptions={descriptions}
            />
            {!reference.props.length &&
                !reference.native.length &&
                !reference.parts.length && (
                    <p className="text-footnote text-label-secondary">
                        This host has no component props. Its
                        setup is described above.
                    </p>
                )}
            {reference.parts.map((part) => (
                <DocSection
                    key={part.name}
                    id={`api-${part.name.replaceAll(".", "-")}`}
                    title={part.name}
                    level={3}
                    collapsible
                >
                    <SurfaceTable surface={part} />
                </DocSection>
            ))}
            <a
                href={`https://github.com/phe-rus/passui/blob/main/${reference.source}`}
                target="_blank"
                rel="noreferrer"
                className="text-footnote text-label-secondary underline-offset-4 hover:underline"
            >
                View the typed source
            </a>
        </div>
    )
}
