import { toast, useContextMenu } from "@passui/react"
import { copyText } from "@passui/react/clipboard"

const photos = [
    { id: "aiko", src: "/avatars/aiko.svg" },
    { id: "kenji", src: "/avatars/kenji.svg" },
    { id: "mira", src: "/avatars/mira.svg" },
]

function Photo({ id, src }: { id: string; src: string }) {
    const menu = useContextMenu(() => [
        {
            label: "Copy image link",
            onSelect: async () => {
                if (
                    await copyText(
                        new URL(src, window.location.href)
                            .href
                    )
                )
                    toast.success("Image link copied")
                else
                    toast.error(
                        "Could not copy the image link"
                    )
            },
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
        "divider",
        {
            label: "Delete",
            destructive: true,
            onSelect: () => toast("Photo deleted"),
        },
    ])

    return (
        <img
            {...menu}
            src={src}
            alt={`${id} portrait`}
            className="aspect-square w-full select-none rounded-3xl object-cover"
        />
    )
}

export function ContextMenuShowcase() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
                {photos.map((photo) => (
                    <Photo key={photo.id} {...photo} />
                ))}
            </div>
            <p className="text-center text-footnote text-label-secondary">
                Right-click a photo, or press and hold on a
                touch screen.
            </p>
        </div>
    )
}
