import { Chip } from "@passui/react"

export function ChipTones() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Chip tone="neutral">Draft</Chip>
            <Chip tone="accent">Featured</Chip>
            <Chip tone="public">Public</Chip>
            <Chip tone="family">Family</Chip>
            <Chip tone="friends">Friends</Chip>
        </div>
    )
}
