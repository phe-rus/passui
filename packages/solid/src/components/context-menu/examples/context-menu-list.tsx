import { createSignal, For, Show } from "solid-js"
import {
    ContextMenuHost,
    useContextMenu,
} from "@passui/solid/context-menu"
import { toast } from "@passui/solid/toast"

type Note = { id: string; title: string; pinned: boolean }

function NoteRow(props: {
    note: Note
    onPin: () => void
    onDelete: () => void
}) {
    const menu = useContextMenu(() => [
        { heading: props.note.title },
        {
            label: props.note.pinned ? "Unpin" : "Pin",
            onSelect: props.onPin,
        },
        {
            label: "Duplicate",
            onSelect: () =>
                toast(`Duplicated ${props.note.title}`),
        },
        "divider" as const,
        {
            label: "Delete",
            destructive: true,
            onSelect: props.onDelete,
        },
    ])
    return (
        <li
            {...menu}
            class="flex select-none items-center justify-between rounded-2xl px-3 py-2.5 text-subheadline text-label hover:bg-fill/60"
        >
            {props.note.title}
            <Show when={props.note.pinned}>
                <span class="text-caption text-accent-text">
                    Pinned
                </span>
            </Show>
        </li>
    )
}

export function ContextMenuList() {
    const [notes, setNotes] = createSignal<Note[]>([
        { id: "1", title: "Trip to Kyoto", pinned: true },
        { id: "2", title: "Groceries", pinned: false },
        { id: "3", title: "Book club picks", pinned: false },
    ])
    return (
        <>
            <ul class="m-0 flex w-full max-w-xs list-none flex-col p-0">
                <For each={notes()}>
                    {(note) => (
                        <NoteRow
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
                                        (item) =>
                                            item.id !==
                                            note.id
                                    )
                                )
                            }
                        />
                    )}
                </For>
            </ul>
            <ContextMenuHost />
        </>
    )
}
