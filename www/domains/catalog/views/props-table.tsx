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
            <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead className="bg-fill/50">
                    <tr>
                        <th className="px-3 py-2">Prop</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Default</th>
                        <th className="px-3 py-2">
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
                                    <td className="px-3 py-2 font-mono font-semibold whitespace-nowrap [overflow-wrap:normal]">
                                        {name}
                                    </td>
                                    <td className="max-w-72 px-3 py-2 font-mono [overflow-wrap:normal]">
                                        <TypeOf
                                            control={control}
                                        />
                                    </td>
                                    <td className="px-3 py-2 font-mono whitespace-nowrap [overflow-wrap:normal]">
                                        {defaultOf(control)}
                                    </td>
                                    <td className="px-3 py-2">
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
