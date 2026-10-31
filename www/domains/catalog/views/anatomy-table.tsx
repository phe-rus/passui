import type { AnatomyPart } from "../types"

type AnatomyTableProps = {
    parts: AnatomyPart[]
}

/** The parts a component is made of, and what each one does. */
export function AnatomyTable({ parts }: AnatomyTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl ring-1 ring-separator/60">
            <table className="w-full border-collapse text-left">
                <thead className="bg-fill/50 *:text-sm!">
                    <tr>
                        <th className="w-36 px-3 py-2">
                            Element
                        </th>
                        <th className="px-3 py-2">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody className='*:text-xs!'>
                    {parts.map((part) => (
                        <tr
                            key={part.element}
                            className="border-separator/60 border-t align-top"
                        >
                            <td className="px-3 py-2 font-semibold">
                                {part.element}
                            </td>
                            <td className="px-3 py-2">
                                {part.required && (
                                    <strong>
                                        Required.{" "}
                                    </strong>
                                )}
                                {part.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
