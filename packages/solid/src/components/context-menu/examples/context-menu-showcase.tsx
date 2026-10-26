import { For } from "solid-js"
import {
    ContextMenuHost,
    useContextMenu,
} from "@passui/solid/context-menu"
import { toast } from "@passui/solid/toast"

const photos = [
    { id: "aiko", src: "/avatars/aiko.svg" },
    { id: "kenji", src: "/avatars/kenji.svg" },
    { id: "mira", src: "/avatars/mira.svg" },
]

function Photo(props: { id: string; src: string }) {
    const menu = useContextMenu(() => [
        {
            label: "Copy",
            onSelect: () => toast("Photo copied"),
        },
        {
            label: "Share",
            onSelect: () => toast("Share sheet"),
        },
        {
            label: "Add to favourites",
            onSelect: () =>
                toast.success("Added to favourites"),
        },
        "divider" as const,
        {
            label: "Delete",
            destructive: true,
            onSelect: () => toast("Photo deleted"),
        },
    ])
    return (
        <img
            {...menu}
            src={props.src}
            alt={`${props.id} portrait`}
            class="aspect-square w-full select-none rounded-3xl object-cover"
        />
    )
}

export function ContextMenuShowcase() {
    return (
        <div class="flex w-full max-w-sm flex-col gap-3">
            <div class="grid grid-cols-3 gap-2">
                <For each={photos}>
                    {(photo) => <Photo {...photo} />}
                </For>
            </div>
            <p class="text-center text-footnote text-label-secondary">
                Right-click a photo, or press and hold on a
                touch screen.
            </p>
            <ContextMenuHost />
        </div>
    )
}
