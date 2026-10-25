import { Chip } from "@passui/react"

const notes = [
    {
        title: "Trip to Kyoto",
        detail: "Edited today",
        tone: "friends",
        tag: "Friends",
    },
    {
        title: "Grandma's recipes",
        detail: "Edited yesterday",
        tone: "family",
        tag: "Family",
    },
    {
        title: "Reading list",
        detail: "Edited Monday",
        tone: "public",
        tag: "Public",
    },
    {
        title: "Q4 plan",
        detail: "Edited last week",
        tone: "neutral",
        tag: "Draft",
    },
] as const

export function ChipShowcase() {
    return (
        <ul className="m-0 flex w-full max-w-sm list-none flex-col divide-y divide-separator/60 overflow-hidden rounded-4xl bg-elevated p-0 shadow-sm ring-1 ring-separator/60">
            {notes.map((note) => (
                <li
                    key={note.title}
                    className="flex items-center justify-between gap-3 px-5 py-3.5"
                >
                    <div className="flex flex-col">
                        <span className="text-subheadline font-semibold text-label">
                            {note.title}
                        </span>
                        <span className="text-footnote text-label-secondary">
                            {note.detail}
                        </span>
                    </div>
                    <Chip tone={note.tone}>{note.tag}</Chip>
                </li>
            ))}
        </ul>
    )
}
