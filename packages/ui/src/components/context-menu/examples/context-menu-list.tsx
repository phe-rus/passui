import { toast, useContextMenu } from "@passui/react"
import { useState } from "react"

type Note = { id: string; title: string; pinned: boolean }

function NoteRow({
    note,
    onPin,
    onDelete,
}: {
    note: Note
    onPin: () => void
    onDelete: () => void
}) {
    const menu = useContextMenu(() => [
        { heading: note.title },
        {
            label: note.pinned ? "Unpin" : "Pin",
            onSelect: onPin,
        },
        {
            label: "Duplicate",
            onSelect: () => toast(`Duplicated ${note.title}`),
        },
        "divider",
        {
            label: "Delete",
            destructive: true,
            onSelect: onDelete,
        },
    ])

    return (
        <li
            {...menu}
            className="flex select-none items-center justify-between rounded-2xl px-3 py-2.5 text-subheadline text-label hover:bg-fill/60"
        >
            {note.title}
            {note.pinned && (
                <span className="text-caption text-accent-text">
                    Pinned
                </span>
            )}
        </li>
    )
}

export function ContextMenuList() {
    const [notes, setNotes] = useState<Note[]>([
        { id: "1", title: "Trip to Kyoto", pinned: true },
        { id: "2", title: "Groceries", pinned: false },
        { id: "3", title: "Book club picks", pinned: false },
    ])

    return (
        <ul className="m-0 flex w-full max-w-xs list-none flex-col p-0">
            {notes.map((note) => (
                <NoteRow
                    key={note.id}
                    note={note}
                    onPin={() =>
                        setNotes((current) =>
                            current.map((item) =>
                                item.id === note.id
                                    ? {
                                          ...item,
                                          pinned:
                                              !item.pinned,
                                      }
                                    : item
                            )
                        )
                    }
                    onDelete={() =>
                        setNotes((current) =>
                            current.filter(
                                (item) => item.id !== note.id
                            )
                        )
                    }
                />
            ))}
        </ul>
    )
}
