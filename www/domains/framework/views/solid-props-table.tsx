import api from "../solid-api.json"

export function SolidPropsTable({
    slug,
    descriptions,
}: {
    slug: string
    descriptions: Record<string, string>
}) {
    const props = api[slug as keyof typeof api]
    if (!props?.length) return null

    return (
        <div className="overflow-x-auto rounded-3xl ring-1 ring-separator/60">
            <table className="w-full min-w-[40rem] border-collapse text-left text-subheadline">
                <thead className="bg-fill/50 text-footnote text-label-secondary">
                    <tr>
                        <th className="px-4 py-3 font-semibold">
                            Prop
                        </th>
                        <th className="px-4 py-3 font-semibold">
                            Type
                        </th>
                        <th className="px-4 py-3 font-semibold">
                            Required
                        </th>
                        <th className="px-4 py-3 font-semibold">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((prop) => (
                        <tr
                            key={prop.name}
                            className="border-separator/60 border-t align-top"
                        >
                            <td className="px-4 py-3 font-mono text-footnote font-semibold text-accent-text">
                                {prop.name}
                            </td>
                            <td className="max-w-72 px-4 py-3 font-mono text-footnote text-label-secondary [overflow-wrap:anywhere]">
                                {prop.type}
                            </td>
                            <td className="px-4 py-3 text-footnote text-label-secondary">
                                {prop.required ? "Yes" : "No"}
                            </td>
                            <td className="px-4 py-3 text-label">
                                {descriptions[prop.name] ??
                                    "SolidJS component property."}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
