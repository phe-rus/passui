import type {
    AnyControl,
    RegisteredDocs,
} from "@passui/react/docs"

type PropsTableProps = {
    docs: RegisteredDocs
    descriptions: Record<string, string>
}

function TypeOf({ control }: { control: AnyControl }) {
    if (control.kind !== "select")
        return (
            <>
                {control.kind === "boolean"
                    ? "boolean"
                    : "string"}
            </>
        )
    return (
        <span className="flex flex-wrap gap-1">
            {Object.keys(control.options).map((option) => (
                <code
                    key={option}
                    className="rounded-md bg-fill/70 px-1.5 py-0.5 whitespace-nowrap"
                >
                    "{option}"
                </code>
            ))}
        </span>
    )
}

function defaultOf(control: AnyControl) {
    return typeof control.default === "string"
        ? `"${control.default}"`
        : String(control.default)
}

/** Every documented prop: its name, type, default and purpose. */
export function PropsTable({
    docs,
    descriptions,
}: PropsTableProps) {
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
                            Default
                        </th>
                        <th className="px-4 py-3 font-semibold">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(docs.controls).map(
                        ([name, control]) =>
                            control ? (
                                <tr
                                    key={name}
                                    className="border-separator/60 border-t align-top"
                                >
                                    <td className="px-4 py-3 font-mono text-footnote font-semibold whitespace-nowrap text-accent-text [overflow-wrap:normal]">
                                        {name}
                                    </td>
                                    <td className="max-w-72 px-4 py-3 font-mono text-footnote text-label-secondary [overflow-wrap:normal]">
                                        <TypeOf
                                            control={control}
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-mono text-footnote whitespace-nowrap text-label-secondary [overflow-wrap:normal]">
                                        {defaultOf(control)}
                                    </td>
                                    <td className="px-4 py-3 text-label">
                                        {descriptions[name]}
                                    </td>
                                </tr>
                            ) : null
                    )}
                </tbody>
            </table>
        </div>
    )
}
